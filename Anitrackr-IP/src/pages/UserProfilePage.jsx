import { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Box } from '@mui/material';
import Swal from 'sweetalert2';
import request from '../utils/request';

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await request({
          method: 'get',
          url: `/api/user/me`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Failed to fetch user info.',
          icon: 'error',
          confirmButtonText: 'Cool',
        });
      }
    };

    fetchUserInfo();
  }, [token]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request({
        method: 'put',
        url: `/api/user/me/username`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { username: userInfo.username },
      });

      Swal.fire({
        title: 'Success!',
        text: 'Username updated successfully.',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update username.',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: 4 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            User Profile
          </Typography>

          <Typography variant="h6">Email: {userInfo.email}</Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={userInfo.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              margin="normal"
            />

            {isEditing ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleEditToggle}>
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button variant="outlined" color="primary" onClick={handleEditToggle} sx={{ mt: 2 }}>
                Edit Username
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfilePage;
