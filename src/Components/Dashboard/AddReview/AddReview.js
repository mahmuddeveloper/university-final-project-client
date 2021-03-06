import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navigation from '../../Shared/Navigation/Navigation';
import UserSidebar from '../../Shared/Sidebar/UserSidebar';
import './../Dashboard.css';
import swal from 'sweetalert';

const AddReview = () => {
    const [imageURL, setImageURL] = useState();
    const {register, handleSubmit} = useForm();
    const onSubmit = data => {
        console.log(data);
        const reviewData = {
            name: data.name,
            from: data.from,
            quote: data.review,
            imageURL: imageURL
        }
        fetch('https://frozen-depths-33463.herokuapp.com/addReview', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(reviewData)
        })
        .then(res => {
            swal({
                title: "Thanks for rating us!",
                icon: "success",
              });
        })
    
    }

    const handleImageUpload = (e) => {
        console.log(e.target.files);
        const imageDate = new FormData();
        imageDate.set('key', 'f5eb43f4038ad35489069e205f012eb4')
        imageDate.append('image', e.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imageDate)
        .then(res => {
            const url = res.data.data.display_url;
            setImageURL(url)
        })
        .catch(err => {
            console.log(err);
        })

    }
    return (
        <div className='add-review-section'>
            <Navigation/>
            <div className="px-3 mx-auto">
                <div className="row">
                    <div className="col-md-3">
                        <UserSidebar/>
                    </div>
                    <div className="col-md-9">
                                <div className="card my-3 p-4">
                                <h5 className='py-3'>Add A Review</h5>
                                    <form className='bg-form' onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-3">
                                                    <label className="form-label h6">Photo</label>
                                                    <input type="file" name='file' className="form-control" onChange={handleImageUpload} required />
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <label className="form-label h6">Name</label>
                                                    <input type="text" name='name' className="form-control" placeholder='Your Name' {...register("name")} required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label h6">From</label>
                                                    <input type="text" name='from' className="form-control" placeholder='Your Location' {...register("from")} required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label h6" >Review</label>
                                                    <textarea name='review' className="form-control"  placeholder='Your Review' {...register("review")} required/>
                                                </div>
                                            
                                            <div className="my-3 text-right pt-3">
                                                <button type="submit" className="btn button-white p-2">GIVE REVIEW</button>
                                        </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>   
        </div>
    );
};

export default AddReview;