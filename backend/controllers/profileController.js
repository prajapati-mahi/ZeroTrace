const User = require("../models/User");
const Report = require("../models/Report");

const getProfile = async (req, res) => {

  try {

    const user =
      await User.findById(req.user.id)
      .select("-password").lean();

    const reports =
      await Report.find({
        user:req.user.id,
      });

    user.createdAt =
user.createdAt ||
new Date();

    const totalReports =
      reports.length;

    const averageSimilarity =
      totalReports===0
      ?0
      :(
        reports.reduce(
          (sum,report)=>
            sum+
            report.plagiarismScore,
          0
        )/totalReports
      ).toFixed(2);

    const averageAI =
      totalReports===0
      ?0
      :(
        reports.reduce(
          (sum,report)=>
            sum+
            report.aiScore,
          0
        )/totalReports
      ).toFixed(2);

    res.json({

      success:true,

      user,

      totalReports,

      averageSimilarity,

      averageAI,

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};

module.exports={
  getProfile,
};