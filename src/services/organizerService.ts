import Organizer from "../models/Organizer";

 const organizerService ={
    createNewOrganizer : (organizer:Object) => {
        return new Promise(async (resolve, reject) => {
            try{
                const newOrganizer = new Organizer(organizer);
                const saveOrganizer = await newOrganizer.save();
                // const { __v, createdAt, updatedAt, ...newOrganizerInfo } = saveOrganizer._doc;
                // resolve(newOrganizerInfo);
            }
            catch(e){
                console.log(e);
                reject(e);
            }
        })
    },
    updateOrganizer : (organizer:Object) => {
        return new Promise(async (resolve, reject) => {
            try{
                // const updateOrganizer = await Organizer.findByIdAndUpdate(
                //     req.params.id, {
                //         $set: req.body,
                //     }, {new: true}
                // )
                // const { __v, createdAt, updatedAt, ...others} = updateOrganizer._doc;       
                // resolve(others);
            }
            catch(e){
                reject(e);
            }
        })
    },
    getListOrganizer : (userId:String) => {
        return new Promise(async (resolve, reject) => {
            try{
                const allOrganizer = await Organizer.find({
                    managedBy: userId
                })
                .sort({createdAt: -1})
                .exec();     
                resolve(allOrganizer);
            }
            catch(e){
                reject(e);
            }
        })
    }
 } 

 export default organizerService