const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432
})

const getUsers = (request, response) => {
    pool.query("SELECT id, username FROM public.users",
        (error, results) => {
            if (error) {
                throw error
            }
            else if (results.rowCount > 0) {
                response.status(200).json(results.rows)
            }
            else {
                response.json("No records found.")
            }
        })
}

function isUsernameValid(username) {
    if (username.trim() == "" || username == null)
        return false
    else
        return true
}

function isIdValid(id) {

    if (!isNaN(id))
        if (parseInt(id))
            return true
        else return false
    else
        return false
}

const addUser = (request, response) => {

    const username = request.body.username
    if (isUsernameValid(username)) {
        pool.query("INSERT INTO public.users (username) VALUES($1)",
            [username], (error, results) => {
                if (error) {
                    response.status(500).json("Error while inserting record.")
                    throw error
                }
                else if (results.rowCount > 0)
                    response.json("Record inserted successfully.")
                else
                    response.status(500).json("Recod not insterted")
            })
    }
    else
        response.status(500).json("username can not be null!")

}

const updateUserById = (request, response) => {

    const id = parseInt(request.body.id)
    const username = request.body.username.toString()

    if (!isIdValid(id)) {
        response.json("User id not valid.")
        return;
    }

    if (isUsernameValid(username)) {
        pool.query("UPDATE users SET username=$1 WHERE id = $2 ",
            [username, id], (error, results) => {
                if (error) {

                    response.status(500).json("Error while updating record.")
                    throw error
                }
                else if (results.rowCount > 0)
                    response.json("Record updated successfully.")
                else
                    response.status(500).json("Recod not updated")
            })
    }
    else
        response.status(500).json("username can not be null!")

}

const deleteUser = (request, response) => {

    const id = parseInt(request.body.id)


    if (isIdValid(id)) {
        pool.query("DELETE FROM public.users WHERE id=$1",
            [id], (error, results) => {
                if (error) {

                    response.status(500).json("Error while deleting record.")
                    throw error
                }
                else if (results.rowCount > 0)
                    response.json("Record deleted successfully.")
                else
                    response.status(500).json("Recod not deleted.")
            })
    }
    else
        response.status(500).json("user id can not be null!")

}

module.exports = {
    getUsers,
    addUser,
    updateUserById,
    deleteUser,
}