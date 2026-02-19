/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('blog_data', {
    id: {
      type: 'varchar(21)',
      primaryKey: true,
    },
    title: {
      type: 'varchar(255)',
      notNull: true,
    },
    slug: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    content: {
      type: 'text',
      notNull: true,
    },
    author: {
      type: 'varchar(50)',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('blog_data');
};
