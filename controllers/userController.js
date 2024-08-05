const loadHome = async (req,res,next)=>{
    try {
        res.render('index')
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={loadHome}