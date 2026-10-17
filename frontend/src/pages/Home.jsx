import { signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from '../../utils/firebase.js'
import api from '../../utils/axios.js'
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';
import Sidebar from '../components/Sidebar.jsx';
import ChatArea from '../components/ChatArea.jsx';
import Artifacts from '../components/Artifacts.jsx';


const Home = () => {

    const { userData } = useSelector(state => state.user)

    // console.log(userData)
    const dispatch = useDispatch()

    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token });
            // console.log(data)
            dispatch(setUserData(data))
        } catch (error) {
            console.log(`handleLogin error : ${error}`)
        }
    }

    const googleLogin = async () => {
        try {
            const data = await signInWithPopup(auth, googleAuthProvider);
            // console.log(data)
            const token = await data.user.getIdToken();
            // console.log(token)
            await handleLogin(token)
        } catch (error) {
            console.log(`googleLogin error : ${error}`)
        }
    }

    return (
        <div className='h-screen flex bg-[#0d0f14] text-white overflow-hidden'>
            <Sidebar />
            <ChatArea />
            <Artifacts />
            {!userData && <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'>
                <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>Welcome to DexterAI</h2>
                        <p className='text-[13px] text-slate-500'>Please login to continue using the app.</p>
                    </div>
                    <button onClick={googleLogin} className='w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200 transition-all duration-150 cursor-pointer'>
                        <FcGoogle size={15} className='text-black/60' />
                        Continue with Google
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default Home
