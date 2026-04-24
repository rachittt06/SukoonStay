// get/api/user/
export const getUserData = async (req, res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({sucess: true, role, recentSearchedCities});

    } catch (error) {
        escape.json({sucess: false, message: error.message});

    }
}

//store user recently searched cities
export const storeSearchedCity = async (req, res) => {
    try {
        const{recentSearchedCities} = req.body;
        const user = req.user;

        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCities);
        }
        else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities);
        }
        await user.save();
        res.json({sucess: true, message:"City stored successfully"});
    } catch (error) {
        res.json({sucess: false, message: error.message});
    }
    }