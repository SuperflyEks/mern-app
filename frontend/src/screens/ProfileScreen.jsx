import { useUpdateMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";


const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();


    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);

    const updateHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.toast("Password does not match");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <>
            <FormContainer>
                <h1>User Profile</h1>
                <Form onSubmit={updateHandler}>
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={ (e) => { setName(e.target.value)} }
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={ (e) => { setEmail(e.target.value)} }
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={ (e) => { setPassword(e.target.value)} }
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="onfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={ (e) => { setConfirmPassword(e.target.value)} }
                        ></Form.Control>
                    </Form.Group>
                    { isLoading && <Loader/>}
                    <Button type="submit" variant="secondary" className="mt-3">
                        Update 
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ProfileScreen;