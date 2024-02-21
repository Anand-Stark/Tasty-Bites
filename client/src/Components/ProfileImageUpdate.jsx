import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import convertToBase64 from "../../helper/ConvertToBase64";
import axiosInstance from "../../api/axiosInstance";
import { userActions } from "../../features/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateImage.module.css";
const ProfileImageUpdate = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const [image, setImage] = useState(user.image);
    const [imagePath, setImagePath] = useState(user.image);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const dispatch = useAppDispatch();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImagePath(URL.createObjectURL(e.target.files[0])); // Preview image locally
        setShowSaveButton(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(`http://localhost:5050/${user.type}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            if (response.status === 200) {
                dispatch(userActions.setImage(`http://localhost:5050/${response?.data?.path}`))
                setShowSaveButton(false);
            }
        }

         catch(error) {
            console.error(error);
        }
    }
    
    return (
        <div className={styles["update-image"]}>
            <label className={styles["update-image__label"]} htmlFor="proimage">
                <input
                    type="file"
                    id="proimage"
                    hidden
                    onChange={handleImageChange}
                />
                {image ? (
                    <img
                        src={imagePath}
                        alt=""
                        className={styles["update-image__image"]}
                    />
                ) : (
                    <div className={styles["update-image__image-icon"]}>
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                )}
            </label>
            {showSaveButton && <button onClick={handleSubmit}>Save</button>}
        </div>
    );
                }
export default ProfileImageUpdate;