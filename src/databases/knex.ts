import Knex from 'knex';
import { knexConfig } from './knexConfig';
import SchemaInspector from 'knex-schema-inspector';

export const knex = Knex(knexConfig);

export const inspector = SchemaInspector(knex);
