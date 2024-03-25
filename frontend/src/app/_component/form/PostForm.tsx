"use client"


import { ChangeEventHandler, FormEvent, FormEventHandler, useState } from "react";
import {Session} from "@auth/core/types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PostProps} from '@/app/models/post'
import Image from 'next/image'
import axios from "axios";
import Modal from "../modal/Modal";
import { RiEditLine, RiImageAddLine } from "react-icons/ri";

type SessionProps = {
    session: Session | null,
}

const PostForm = ({session}: SessionProps) => {
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | null>('');
    
    const onPost = () => {
        setIsModalOpen(true)
    }

    const [resData, setResData] = useState({
        code: 0,
        message: "",
    })

    const [formData, setFormData] = useState<any>({
        postImage: null,
        postTitle: "", 
        postContent: ""
    })

    const queryClient = useQueryClient()

    const handleImageChange : ChangeEventHandler<HTMLInputElement> = (e) => {
        const files = e.target.files;
        
        setFormData((prevState: any) => {
            return {...prevState, ['postImage']: files}
        });
        
        if (files && files[0] && files[0].type.startsWith('image/')) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };
    
    const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
    };

    const mutation = useMutation({
        mutationFn: async (e: FormEvent) => {
            e.preventDefault();

            const {postImage, postTitle, postContent} = formData
            
            const userInfo: any = session?.user
            const imageFile = postImage || ""
            const title = postTitle
            const content = postContent

            console.log('userInfo', userInfo)
            console.log('title', title)
            console.log('content', content)


            if (title.length === 0) {
                setResData({code: 4001, message: '제목을 입력해 주세요'})
                return;
            }
            
            if (content.length === 0) {
                setResData({code: 4002, message: '내용을 입력해 주세요'})
                return 
            }

            const _formData = new FormData()

            _formData.append('userInfo', userInfo)
            _formData.append('image', imageFile)
            _formData.append('tit', title)
            _formData.append('con', content)
            
            return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/posts`, {
                userInfo: userInfo,
                image: imageFile[0],
                tit: title,
                con: content
            });
        },
        async onSuccess(response, variable) {
            const newPost = await response?.data;

            if (queryClient.getQueryData(['posts'])) {
                queryClient.setQueryData(['posts'], (prevData: { pages: PostProps[][] }) => {
                    const shallow = {
                        ...prevData,
                        pages: [...prevData.pages],
                    };

                    shallow.pages[0] = [...shallow.pages[0]];
                    shallow.pages[0].unshift(newPost);
                    
                    return shallow;
                });
            }

            setIsModalOpen(false)
            
        },
        onError(error) {
            console.error(error);
            alert('업로드 중 에러가 발생했습니다.');
        }
    })
    
    return (
        <div className="edit-wrap">
            <button type="button" className="btn-post" onClick={onPost}>
                <RiEditLine size={16} />
                게시글 작성
            </button>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={mutation.mutate}>
                    <div className="post-form">
                        <dl>
                            <dt>이미지</dt>
                            <dd className="first">
                                <div className='img-thumnail'>
                                    <label className='img-label' htmlFor='avatar'>
                                        {preview ? (
                                            <Image src={preview} width={80} height={80} alt="Preview" />
                                        ) : (
                                            <RiImageAddLine size={80} color='#ccc'/>
                                        )}
                                    </label>
                                    <input id="avatar" type="file" name="postImage" accept="image/*" onChange={handleImageChange}/>
                                </div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>제목</dt>
                            <dd>
                                <input 
                                    type="text"
                                    name="postTitle"
                                    className={`${resData.code === 4001 ? 'wran' : ''}`}
                                    placeholder='제목을 입력해 주세요' 
                                    onChange={handleInputChange}
                                />
                                {resData.code === 4001 && <p className="txt-warn">{resData.message}</p>}
                            </dd>
                        </dl>
                        <dl>
                            <dt>내용</dt>
                            <dd>
                                <textarea name="postContent" placeholder='내용 입력해 주세요' onChange={handleInputChange}/>
                                {resData.code === 4002 && <p className="txt-warn">{resData.message}</p>}
                            </dd>
                        </dl>
                        
                        <div className='btn-area'>
                            <button type="submit" className='btn-submit'>등록하기</button>
                        </div>
                    </div>
                    
                </form>
            </Modal>
        </div>
    )
}

export default PostForm