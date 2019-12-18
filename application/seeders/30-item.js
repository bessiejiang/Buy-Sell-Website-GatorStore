const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const { Item } = require("../models");

/**
 * If you modify something here make sure to run:
 * ```
 * ./scripts/db reset
 * ```
 *
 * WARNING: That will remove all data from the database and replace it with only
 *          the data from the seeders folder!
 */

const seedName = path.basename(__filename, ".js");
const seedImagesPath = path.join(__dirname, seedName + "-images");
const staticImagesPath = path.join(__dirname, "..", "src", "static", "photos");

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Copy images from 01-item-images to src/static/images
    const start = Date.now();
    const images = fs.readdirSync(seedImagesPath);

    try {
      fs.statSync(staticImagesPath);
    } catch (e) {
      fs.mkdirSync(staticImagesPath);
    }

    for (const image of images) {
      fs.copyFileSync(
        path.join(seedImagesPath, image),
        path.join(staticImagesPath, image)
      );
    }

    const duration = (Date.now() - start) / 1000;

    console.log(
      `== ${path.basename(__filename, ".js")}: copied images (${duration}s)`
    );

    // All items have an id that starts at 1 and goes up from there
    return queryInterface.bulkInsert(
      Item.tableName,
      setDefaults([
        {
          title: "IKEA Sofa",
          price: 150,
          description:
            "Selling my sofa I had for 3 semesters.\nColor is light gray. Clean, no stains.",
          photo: "/static/photos/456776348_0d3644f73c_k.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 1
        },
        {
          title: "CSC 510 textbook",
          price: 70,
          description:
            "Foundations of Algorithms Using C++ Pseudocode (Third Edition).\nISBN: 0763723878. Good condition.",
          photo: "/static/photos/23170998252_1c52ebc167_o.jpg",
          approval: "pending",
          UserId: 1,
          CategoryId: 2
        },
        {
          title: "My book",
          price: 1,
          description: "Book for sale",
          photo: null,
          approval: "rejected",
          UserId: 1,
          CategoryId: 2
        },
        {
          title: "Sector 9 longboard",
          price: 35,
          description:
            "Bearings are only one month old. It's a great board and has had lot's of use.\nSelling this because I got a boosted board now.",
          photo: "/static/photos/5697784828_41e0a5b365_k.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 4
        },
        {
          title: "MATH 324 textbook",
          price: 135,
          description:
            "Math book for MATH 324. No writing in it. I got it brand new.",
          photo: "/static/photos/4764741238_6d041f648e_h.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 2
        },
        {
          title: "Algorithm Introduction Book",
          price: 200,
          description:
            "Introduction to Algorithms. Chinese Version. Good book for CSC810.",
          photo: "/static/photos/algorithmbook.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 2
        },
        {
          title: "Office Chair",
          price: 150,
          description: "Office chair in good condition. Pick up in person.",
          photo: "/static/photos/chair.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 1
        },
        {
          title: "Dinning Table",
          price: 350,
          description:
            "Very large table with three other chairs in total for 350",
          photo: "/static/photos/dinningtable.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 1
        },
        {
          title: "Bread Maker",
          price: 50,
          description:
            "I already have one bread maker, so I do not need this one. It is brand new",
          photo: "/static/photos/breadmaker.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 3
        },
        {
          title: "Water Boiler",
          price: 60,
          description:
            "It is still functional after using for one year. Contact me if you want it",
          photo: "/static/photos/waterboil.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 3
        },
        {
          title: "Artist Teacher",
          price: 35,
          description:
            "I can teach you water color painting, pencil sketching, sculpture and computer-aid 3D animation. Feel free to contact me",
          photo: "/static/photos/artist_teacher.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 5
        },
        {
          title: "Astronomy Teacher",
          price: 35,
          description:
            "Do you want to explore the mystery of galaxy? Come to my class and I will guide you a fantastic trip to the milky way",
          photo: "/static/photos/astronomy_teacher.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 5
        },
        {
          title: "Math Teacher",
          price: 35,
          description:
            "Are you still bothered with the difficult math problems? I can help you to fix it out and teach you how to cope with similar problems",
          photo: "/static/photos/math_teacher.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 5
        },
        {
          title: "Physics Teacher",
          price: 35,
          description:
            "Interested in the nature of this world? Physics is the very point where you start know more about what is around you",
          photo: "/static/photos/physics_teacher.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 5
        },
        {
          title: "Coding Teacher",
          price: 50,
          description:
            "I am an experienced coder and enrolled computer science student. Interested in developing your own website and start to make MONEY??? Come to my class and let me teach you how!",
          photo: "/static/photos/coding_teacher.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 5
        },
        {
          title: "Zoologist Teacher",
          price: 10,
          description:
            "I am NOT a body artist. I am simply obsessed with the plants growing in wild. In my class, I can take you to see something you never see in the city. Let's follow the Tail of the Sun!!",
          photo: "/static/photos/zoologist_teacher.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 5
        },
        {
          title: "The Last Panda - George Schaller",
          price: 10,
          description:
            "Selling book in good condition, so pencil marks or bend pages",
          photo: "/static/photos/the-last-panda.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 2
        },
        {
          title: "Small black table",
          price: 15,
          description:
            "Table is sturdy and has held up well. Great for next to a couch. I am moving and everything must go.",
          photo: "/static/photos/small-table.jpg",
          approval: "pending",
          UserId: 1,
          CategoryId: 1
        },
        {
          title: "Plastic white chair",
          price: 15,
          description: "Chair can go well with a small desk",
          photo: "/static/photos/white-chair.jpg",
          approval: "pending",
          UserId: 1,
          CategoryId: 1
        },
        {
          title: "PS4",
          price: 300,
          description: "Used PS4 with controller and cables. Good condition, lightly used. Price negotialble",
          photo: "/static/photos/ps4.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 3
        },
        {
          title: "Saving the World by James Patterson",
          price: 10,
          description: "Book was used for one of my classes and I no longer need it",
          photo: "/static/photos/white-chair.jpg",
          approval: "approved",
          UserId: 1,
          CategoryId: 2
        }
      ]),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    // Remove images from src/static/images
    const start = Date.now();
    rimraf.sync(staticImagesPath);
    const duration = (Date.now() - start) / 1000;

    console.log(
      `== ${path.basename(__filename, ".js")}: removed images (${duration}s)`
    );

    return queryInterface.bulkDelete(Item.tableName, null, {});
  }
};

/**
 * Set default id, createdAt, and updatedAt values.
 *
 * @param {*} items The items to set default values on
 */
function setDefaults(items) {
  const now = new Date();
  let id = 1;

  for (const item of items) {
    item.id = id++;
    // Created at is set to go back in increments of 1 hour
    item.createdAt = new Date(now - 60 * 60 * 1000 * (item.id - 1));
    item.updatedAt = now;
  }

  return items;
}
