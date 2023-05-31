/**
 * -----------------------------------------------
 *              Basic Security Layer
 * -----------------------------------------------
 * 
 * 1. Do not show the link to them who should not see it
 *    only show to the person/types of user who should see it
 * 
 * 2. Do not allow to visit the link by typing on the url by (creating admin route)
 * if not admin then redirect to any other page. you could logout user and send them to the login page as well.
 * 
 * _________________________
 * 
 *      To Send Data
 * _________________________
 * 
 * 1. verify jwt token (send authorization token within header to the server)
 * if possible use axios to send jwt token by intercepting the request(axiosSecure = axios.create())
 * 2. if it is an admin activity. Make sure only admin user is posting data
 * by using verifyAdmin
 * 
 */