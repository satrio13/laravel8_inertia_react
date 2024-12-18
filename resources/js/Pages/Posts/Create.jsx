import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/inertia-react';

const Create = () => 
{   
    const { errors } = usePage().props;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        setLoading(true);
        Inertia.post('/posts', { title, content }, 
        {
            onSuccess: () => {
                setLoading(false);
                Inertia.visit('/posts'); 
            },
            onError: (error) => {
                console.error(error)
                setLoading(false);
            }
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center mb-5">CRUD LARAVEL 8 + INERTIA + REACT</h1>
                    <div className="card border-0 rounded shadow">
                        <div className="card-header">
                            <h3>Create New Post</h3>
                        </div>  
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" id="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul"
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Content</label>
                                    <textarea id="content" className={`form-control ${errors.content ? 'is-invalid' : ''}`} value={content} onChange={(e) => setContent(e.target.value)} rows="5" placeholder="Masukkan konten"
                                    ></textarea>
                                    {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        'Save'
                                    )}
                                </button>
                                <Link href="/posts" className="btn btn-danger float-end">Back</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;