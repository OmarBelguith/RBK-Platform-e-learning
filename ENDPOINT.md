<h1 id="welcome-to-endpoint-maker">Welcome to Endpoint Maker!</h1>
<p>This File will guide through the steps of creating an Endpoint inside Flow-Backend</p>
<h2 id="step-1">Step 1:</h2>
<p>If you are dealing with the database in the endpoint you will need to make a Service that interacts with the database inside <code>dbService</code> Folder Under <code>services</code> Folder<br>
If you are dealing with an external API with your endpoint you will need to create a new folder that has an expressive name of what it interacts with under <code>services</code> Folder then export and add it to the <code>index.js</code> in the <code>services</code> Folder following this line of code</p>
<pre><code>module.exports={
    DbService:  require('./dbService'),
    **NewService: require('./newService')**
};
</code></pre>
<h2 id="step-2">Step 2:</h2>
<p>After Finishing with the service and exporting all the functions. We need to create an operation that will be called by the controller. This Operation will be created under the <code>operations</code> Folder by creating a <code>newOperation</code> Folder that will have an expressive name of what it really does. Inside the <code>newOperation</code> Folder you will create an <code>index.js</code> that will export the different functionalities of the operation.</p>
<h3 id="newoperation.js-template-"><code>newOperation.js</code> template :</h3>
<pre><code>const  Operation  =  require('../operation');
// Creating a class for your Operation
class  NewOperation extends  Operation {
    constructor() {
	    super();
	    // Initializing variables for services
    }
    // Create class methods
    async  login({ email, password }) {
	    // This function will handle the login for the user
	    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } =  this.outputs;
	    try {
		    // Type your operations with the service or any logic here
		    
		    // return to Success info and the object
		    return  this.emit(SUCCESS, {})
		} catch (error) {

		    console.log(error)
		    if (error.message  ===  'ValidationError') {
		    return  this.emit(VALIDATION_ERROR, error);
		    } else  if (error.message  ===  "NotFoundError") {
		    return  this.emit(NOT_FOUND, error)
		    } else {
		    return  this.emit(ERROR, error);
		    }
		 }
    }
}   
NewOperation.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);
module.exports  =  NewOperation;
</code></pre>
<h2 id="step-3">Step 3:</h2>
<p>After Finishing your Operation you will need to make a new Controller. For this you need to create a <code>newController</code> Folder under the <code>controllers</code> Folder and export it in the <code>index.js</code> file <code>controllers</code> Folder. Inside the <code>newController</code> Folder create an <code>index.js</code> file where you can export all the controller files you have made inside the <code>newController</code> folder.</p>
<h3 id="newcontroller.js-template"><code>newController.js</code> Template:</h3>
<pre><code>const  NewOperationClass=  require('../../operations/newOperation').NewOperation;
module.exports={
   /*This will handle the newController endpoint params
    *@param  req
    *@param  res
    *@param  next
    *@returns  {Promise&lt;void&gt;}
    */
    async controllerFunction(req, res, next){
	    const newOperation = new NewOperationClass();
	    const {SUCESS, ERROR, VALIDATION_ERROR, NOT_FOUND} = newOperation.outputs
	    try{
		newOperation.on(SUCCESS, callback)
		.on(ERROR, next)
		.on(VALIDATION_ERROR, next)
		.on(NOT_FOUND, next)    
	    }catch(error){
		    //handle error
	    }
	    newOperation.operationFunction(params);
    }
}
</code></pre>
<h2 id="step-4">Step 4:</h2>
<p>After Finishing the controller you need to make a route for you Endpoint. In order to do this you need to go to the <code>routes</code> folder and the <code>api</code> folder and make a new <code>route</code> folder that expresses the purpose of this route and then inside the folder <code>newRoute</code> create an <code>index.js</code> that will have all the routes of the Folder then use it inside <code>api</code>'s folder <code>index.js</code>.</p>
<h3 id="index.js-template-for-the-newroute-folder"><code>index.js</code> Template for the <code>newRoute</code> Folder:</h3>
<pre><code>const router = require('express').Router();
const Controller = require('../../../controllers);
router.httpMethod('/someRoute', Controller.newController.controllerFunction)
// other routes go here all the functions need to use the controller
module.exports = router;
</code></pre>
<h2 id="step-5">Step 5</h2>
<p>Test your API using <a href="https://www.getpostman.com/">postman</a> try as many scenarios as you can imagine</p>
