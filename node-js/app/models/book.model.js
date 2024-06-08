module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      filePath: {
        type: Sequelize.STRING
      }
    });
  
    return Book;
  };
  