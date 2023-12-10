import { knex } from '../databases/knex';
import { Image } from '../models/image.model';
import { Product } from '../models/product.model';
import { Size } from '../models/size.model';
import { UpLoadImageService } from './uploadImage.service';

export class ProductService {
  static async create({
    name,
    description,
    sizes,
    image,
    imageLinks
  }: {
    name: string;
    description: string;
    sizes: { sizeName: string; quantity: number; price: number }[];
    image: any;
    imageLinks: string[];
  }): Promise<void | null> {
    try {
      // Thời gian gấp rút, xử dụng image address trên interntet để làm luôn cho lẹ
      const uploadImageService = UpLoadImageService.getInstance();
      let finalImageLink: string[];
      // image is upload file, imageLink is a link in internet
      if (!image && !imageLinks) {
        imageLinks = ['https://laforce.vn/wp-content/uploads/2021/06/giay-da-oxford-nam-gnla135-5-n-4.jpg'];
      } else if (image && !imageLinks) {
        finalImageLink = [await uploadImageService.uploadImage(image)]; // Hiện tại vì k còn thời gian, upfile chỉ xử lí up 1 ảnh
      } else if (!image && imageLinks) {
        finalImageLink = imageLinks;
      }
      return await knex.transaction(async (trx) => {
        const [productIdObj] = await trx('Products')
          .insert({
            name,
            description,
            deleted: false
          })
          .returning('productId');

        for (const imageLink of finalImageLink) {
          await trx('Images').insert({
            productId: productIdObj.productId,
            imageLink: imageLink
          });
        }

        for (const size of sizes) {
          await trx('Sizes').insert({
            productId: productIdObj.productId,
            ...size
          });
        }

        await trx.commit();
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async deleteById(productId: string): Promise<void> {
    try {
      await knex.transaction(async (trx) => {
        await trx('Sizes').where({ productId }).del();
        await trx('Images').where({ productId }).del();
        await trx('Products').where({ productId }).del();

        await trx.commit();
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  static async deleteAll(): Promise<void> {
    try {
      await knex.transaction(async (trx) => {
        await trx('Sizes').del();
        await trx('Images').del();
        await trx('Products').del();

        await trx.commit();
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  static async getProductById(productId: number): Promise<any | null> {
    try {
      const product: any = await knex('Products').select('Products.*').where('Products.productId', productId).first();
      const sizes = await knex('Sizes')
        .select('Sizes.quantity', 'Sizes.price', 'Sizes.sizeName')
        .where('Sizes.productId', productId);
      product.sizes = sizes;
      const images: string[] = await knex('Images').select('Images.imageLink').where('Images.productId', productId);
      product.images = images;
      return product;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }

  static async getAllProducts(): Promise<any[]> {
    try {
      const products = await knex('Products')
        .select('Products.*', 'Sizes.*', 'Images.*')
        .leftJoin('Sizes', 'Products.productId', 'Sizes.productId')
        .leftJoin('Images', 'Products.productId', 'Images.productId');

      const groupedProducts = products.reduce((acc: Product[], product: any) => {
        const existingProduct = acc.find((p: Product) => p.productId === product.productId);
        const { productId, name, description, deleted, ...rest } = product;
        if (!existingProduct) {
          const formattedProduct: Product & { sizes: Size[]; images: Image[] } = {
            productId,
            name,
            description,
            deleted,
            sizes: [],
            images: []
          };
          if (rest.sizeName && rest.quantity) {
            formattedProduct.sizes.push({
              sizeName: rest.sizeName,
              quantity: rest.quantity,
              price: rest.price
            });
          }
          if (rest.imageLink) {
            formattedProduct.images.push(rest.imageLink);
          }
          acc.push(formattedProduct);
        } else {
          if (rest.sizeName && rest.quantity) {
            const hasSize = existingProduct.sizes.find((sizeObj: any) => sizeObj.sizeName === rest.sizeName);
            if (!hasSize) {
              existingProduct.sizes.push({
                sizeName: rest.sizeName,
                quantity: rest.quantity,
                price: rest.price
              });
            }
          }
          if (rest.imageLink) {
            if (!existingProduct.images.includes(rest.imageLink)) {
              existingProduct.images.push(rest.imageLink);
            }
          }
        }
        return acc;
      }, []);

      return groupedProducts;
    } catch (error) {
      console.error('Error fetching all products with sizes and images:', error);
      throw error;
    }
  }

  static async update({
    productId,
    name,
    description,
    sizes,
    image,
    imageLinks
  }: {
    productId: number;
    name?: string;
    description?: string;
    sizes?: { sizeName: string; quantity: number; price: number }[];
    image?: any;
    imageLinks?: string[];
  }): Promise<void | null> {
    try {
      const uploadImageService = UpLoadImageService.getInstance();
      let finalImageLink: string[];
      if (!image && !imageLinks) {
        imageLinks = ['https://laforce.vn/wp-content/uploads/2021/06/giay-da-oxford-nam-gnla135-5-n-4.jpg'];
      } else if (image && !imageLinks) {
        finalImageLink = [await uploadImageService.uploadImage(image)];
      } else if (!image && imageLinks) {
        finalImageLink = imageLinks;
      }

      await knex.transaction(async (trx) => {
        if (name || description) {
          await trx('Products')
            .where({ productId })
            .update({
              name: name || knex.raw('name'),
              description: description || knex.raw('description')
            });
        }

        // Remove existing images for the product
        await trx('Images').where({ productId }).del();

        // Insert updated images
        for (const imageLink of finalImageLink) {
          await trx('Images').insert({
            productId,
            imageLink
          });
        }

        // Remove existing sizes for the product
        await trx('Sizes').where({ productId }).del();

        // Insert updated sizes
        if (sizes && sizes.length > 0) {
          for (const size of sizes) {
            await trx('Sizes').insert({
              productId,
              ...size
            });
          }
        }

        await trx.commit();
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
}
