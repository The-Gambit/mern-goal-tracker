import { GoalContextProvider } from '../contexts/goalContext';
import { useUserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GoalForm } from '../components/goalForm';
import { GoalsList } from '../components/goalsList';


const Dashboard = () => {
    const { auth } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate('/login', { replace: true })
        }
    }, [auth, navigate]);

    return (
        <div>
            <h3 className='heading'>Hello {auth?.name}</h3>
            <GoalContextProvider>
                <GoalForm />
                <GoalsList/>
            </GoalContextProvider>
        </div>
    );
}

export default Dashboard;