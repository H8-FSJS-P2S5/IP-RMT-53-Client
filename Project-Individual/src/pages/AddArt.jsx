import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { request } from "../util/axios";
import Form from "../components/Form";


export default function AddArt() {
    const [art, setArt] = useState({
        title: "Mona Lisa",
        description: "Lukisan ini dimiliki oleh pemerintah Prancis dan dipamerkan di Musée du Louvre di Paris. Mona Lisa. Bahasa Italia: La Gioconda, Bahasa Prancis: La Joconde.",
        artis: "Leonardo Da Vinci",
        price: 599999,
        quantity: 1,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        originId: 1,
        UserId: 2
    })

    const nav = useNavigate();
    const handleCreate = async (formdata) => {
        try {
            await request({
                method: "post",
                url: "/user/post/private/arts",
                data : formdata,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            setArt({
                title: '',
                description: '',
                artis: '',
                price: '',
                quantity: '',
                imageUrl:'',
                originId: '',
                userId: ''
            })

            nav('/user/get/private/home')
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "Cool",
              });
            }
        }
    

    return(
        <>
        <Form art={art} handleSubmit={handleCreate}/>
        </>
    )
}