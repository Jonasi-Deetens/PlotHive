import "../assets/styles/components/UserUpdateForm/userupdateform.css"
import React, { useContext, useState } from 'react'
import { UserContext } from '../providers/UserContext';

const UserUpdateForm = () => {
    const { user } = useContext(UserContext)
    const [error, setError] = useState(null);
    const [succes, setSucces] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData ={
            password: formData.get("password"),
            confirmPassword: formData.get("confirm-password"),
        };
        try {
            const response = await fetch('http://127.0.0.1:5000/api/users/' + user._id, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            if (!response.ok) {
                const error = await response.json();
                setError(error.message);
            } else {
                setSucces("Update succesfull!");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='profile-update'>
            <p className="profile-error">{error}</p>
            <p className="profile-succes">{succes}</p>
            <form action="" onSubmit={handleSubmit} className='profile-update-form'>
                <div className="password">
                    <label htmlFor="password">New Password</label>
                    <div className="password-input">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="*****"
                    />
                    </div>
                    <hr />
                </div>
                <div className="confirm-password">
                    <label htmlFor="confirm-password">Confirm New Password</label>
                    <div className="confirm-password-input">
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="*****"
                    />
                    </div>
                    <hr />
                </div>
                <button className="update-button" type="submit">Update</button>
            </form>
        </div>
    )
}

export default UserUpdateForm