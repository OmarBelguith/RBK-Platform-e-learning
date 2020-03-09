const Operation = require('../operation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const userService = require('../../services')
const config = require('config');
const middleware = require('../../middleware/authenticateJWT')

class UserOperation extends Operation {
	constructor() {
		super();
		this.userService = userService;
	}

	async login({
		email,
		password
	}) {
		const {
			SUCCESS,
			ERROR,
			VALIDATION_ERROR,
			NOT_FOUND
		} = this.outputs;
		try {
			const user = await this.userService.userServices.findOneUser({
				email
			})
			if (!user)
				return this.emit(SUCCESS, {
					message: 'Email does not exist'
				})

			if (!(await bcrypt.compare(password, user.password)))
				return this.emit(SUCCESS, {
					message: 'Password is not correct'
				})

			const accessToken = jwt.sign({
				userID: user._id
			}, process.env.SECRET || config.SECRET, {
				expiresIn: "1d"
			});
			await this.userService.userServices.updateUser({_id: user._id},{accessToken})
			return this.emit(SUCCESS, {
				accessToken,
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				role: user.role,
				photoName :user.photoName
			})

		} catch (error) {
			console.log(error)
			if (error.message === 'ValidationError') {
				return this.emit(VALIDATION_ERROR, error);
			} else if (error.message === "NotFoundError") {
				return this.emit(NOT_FOUND, error)
			} else {
				return this.emit(ERROR, error);
			}
		}
	}

	async getUser(query,token) {
		const {
			SUCCESS,
			ERROR,
			VALIDATION_ERROR,
			NOT_FOUND
		} = this.outputs;
		try {
			
			
			if(user.role === 'onboarder')
			{
			const users = await this.userService.userServices.getUsers(query)
			return this.emit(SUCCESS, {
				users
			})}
			else
			return this.emit(SUCCESS, {
				message:'you are not an onboarder'
			})
		} catch (error) {
			console.log(error)
			if (error.message === 'ValidationError') {
				return this.emit(VALIDATION_ERROR, error);
			} else if (error.message === "NotFoundError") {
				return this.emit(NOT_FOUND, error)
			} else {
				return this.emit(ERROR, error);
			}
		}
	}
	async addUser(data,token,photoName) {
		const {
			SUCCESS,
			ERROR,
			VALIDATION_ERROR,
			NOT_FOUND
		} = this.outputs;
		try {
			const tokenget = token.split(' ')[1];
			const user = await this.userService.userServices.findOneUser({accessToken : tokenget })

			if(user.role === 'onboarder')
			{
				
				data.photoName = photoName;
				console.log(photoName);
			const user = await this.userService.userServices.addUser(data)
			return this.emit(SUCCESS, {
				user
			})}
			else 
			return this.emit(SUCCESS, {
				message:'you are not an onboarder'
			})
		} catch (error) {
			console.log(error)
			if (error.message === 'ValidationError') {
				return this.emit(VALIDATION_ERROR, error);
			} else if (error.message === "NotFoundError") {
				return this.emit(NOT_FOUND, error)
			} else {
				return this.emit(ERROR, error);
			}
		}
	}
	async updateProfile(data,token) {
		const {
			SUCCESS,
			ERROR,
			VALIDATION_ERROR,
			NOT_FOUND
		} = this.outputs;
		try {
			const tokenget = token.split(' ')[1];
			const user = await this.userService.userServices.findOneUser({accessToken : tokenget })
			await this.userService.userServices.updateUser(user._id,data)
			const updatedUser = await userService.userServices.findOneUser(user._id)
			return this.emit(SUCCESS, {
				updatedUser
			})
			
		} catch (error) {
			console.log(error)
			if (error.message === 'ValidationError') {
				return this.emit(VALIDATION_ERROR, error);
			} else if (error.message === "NotFoundError") {
				return this.emit(NOT_FOUND, error)
			} else {
				return this.emit(ERROR, error);
			}
		}
	}
	async updateUser(data,token) {
		const {
			SUCCESS,
			ERROR,
			VALIDATION_ERROR,
			NOT_FOUND
		} = this.outputs;
		try {
			
			const tokenget = token.split(' ')[1];
			const user = await this.userService.userServices.findOneUser({accessToken : tokenget })

			if(user.role === 'onboarder')
			{
			await this.userService.userServices.updateUser(data._id,data)
			const updatedUser = await userService.userServices.findOneUser({_id :data._id})
			console.log(data);
			
			return this.emit(SUCCESS, {
				updatedUser
			})
		}
			else return this.emit(SUCCESS, {
				message:'you are not an onboarder'
			})
		
		} catch (error) {
			console.log(error)
			if (error.message === 'ValidationError') {
				return this.emit(VALIDATION_ERROR, error);
			} else if (error.message === "NotFoundError") {
				return this.emit(NOT_FOUND, error)
			} else {
				return this.emit(ERROR, error);
			}
		}
	}

}
UserOperation.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);
module.exports = UserOperation;