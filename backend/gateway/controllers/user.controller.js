export const getCurrentUser = async (req , res)=>{
    try {
        // console.log({user:req.user})
        return res.status(200).json(req.user)

    } catch (error) {
        console.log(`Getting current user error: ${error}`)
        res.status(500).json({message:`Getting current user error: ${error}`})
    }
}