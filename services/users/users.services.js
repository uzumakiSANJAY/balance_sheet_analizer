const { userDetails } = require("../../models");

const userServices = {
    
    async addUsers(data) {
        return await userDetails.create(data);
    },
    
    // async findCatgeoryById(categoryId) {
    //     return await grievanceCategory.findOne({
    //         where: {
    //             categoryId,
    //             freezed: 0
    //         },
    //         raw: true
    //     });
    // },

    // async findAllGrievanceCategories() {
    //     return await grievanceCategory.findAll({
    //         where: {
    //             freezed: 0
    //         },
    //         attributes: ["categoryId", "category"],
    //         order: [["categoryId", "DESC"]],
    //         raw: true
    //     });
    // },

    

    // async addGrievanceCategory(data) {
    //     return await grievanceCategory.create(data);
    // }
};

module.exports = userServices;
