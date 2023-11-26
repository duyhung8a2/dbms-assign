import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('EMPLOYEE', function (table) {
      table.integer('ID').primary();
      table.string('NAME', 100);
      table.string('TITLE', 100);
      table.string('SALARY', 50);
      table.string('BONUS_STRUCTURE', 50);
      table.integer('TIME_OFF');
      table.integer('SICK_TIME');
      table.string('HEALTH_PLAN', 100);
      table.string('VISION_PLAN', 100);
      table.string('DENTAL_PLAN', 100);
      table.integer('PLAN');
      table.integer('SAVINGS');
    })
    .then(function () {
      return knex('EMPLOYEE').insert([
        {
          ID: 1,
          NAME: 'Chris Montgomery',
          TITLE: 'Manager',
          SALARY: '110,000',
          BONUS_STRUCTURE: '5% Quarterly',
          TIME_OFF: 15,
          SICK_TIME: 5,
          HEALTH_PLAN: 'Blue Cross and Blue Shield',
          VISION_PLAN: 'Aetna Vision',
          DENTAL_PLAN: 'Delta Dental',
          PLAN: 25000,
          SAVINGS: 12000
        },
        {
          ID: 2,
          NAME: 'Marie Sylvester',
          TITLE: 'Programmer',
          SALARY: '85,000',
          BONUS_STRUCTURE: '1% Quarterly',
          TIME_OFF: 10,
          SICK_TIME: 5,
          HEALTH_PLAN: 'Blue Cross and Blue Shield',
          VISION_PLAN: 'Aetna Vision',
          DENTAL_PLAN: 'Aetna Dental',
          PLAN: 22000,
          SAVINGS: 16000
        }
      ]);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('EMPLOYEE');
}
