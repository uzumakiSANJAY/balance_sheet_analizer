const userServices = require("../../services/users/users.services");
const { controller } = require("../../common/helpers/controller");

const usersController = {
    addUsers: controller(async (req, res) => {
        const createObj = {
            ...req.body,
            
        };

        const result = await userServices.addUsers(createObj);
        res.send({
            status: true,
            message: "Users added successfully",
            data: result
        });
    }),
    // getAllGrievanceCategories: controller(async (req, res) => {
    //     const results = await grievanceServices.findAllGrievanceCategories();
    //     res.send({
    //         status: true,
    //         message: "Category fetched successfully",
    //         data: results
    //     });
    // }),
    
    // addGrievance: controller(async (req, res) => {
    //     const grievanceData = {
    //         ...req.body,
    //         createdBy: req.user.globalId,
    //         createdAt: getCurrentDateTime()
    //     };

    //     if (req.file) {
    //         grievanceData.fileName = req.file.originalname;
    //         grievanceData.fileUrl = getRealPath(req.file.path);
    //     }

    //     await grievanceServices.addGrievance(grievanceData);

    //     res.send({
    //         status: true,
    //         message: "Grievance added successfully"
    //     });
    // })
};

module.exports = usersController;