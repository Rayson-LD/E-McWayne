import bcrypt from 'bcryptjs'
const user = [
    {
        name:'Rayson',
        email:'rayson@example.com',
        password:bcrypt.hashSync('orange'),
        isAdmin:true
    },
    {
        name:'Regina',
        email:'regina@example.com',
        password:bcrypt.hashSync('orange'),
        
    },
    {
        name:'Edward',
        email:'edward@example.com',
        password:bcrypt.hashSync('orange'),
        
    },
]
export default user;