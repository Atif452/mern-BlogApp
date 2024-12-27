import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Typography, Container, Grid } from '@mui/material';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(`http://localhost:8000/getUser/6763cf4bc9206241bbb0e86d`);
      setProfile(res.data);
      console.log(res.data);
    };
    fetchProfile();
  }, []);

  return (
    <Container>
      {profile && (
        <>
          {/* <Avatar src={profile.user.profilePicture} /> */}
          <Typography variant="h5">{profile.user.name}</Typography>
          <Typography>{profile.user.email}</Typography>
          <Grid container spacing={2}>
            {/* {profile.posts.map((post) => (
              <Grid item key={post._id} xs={12} md={6}>
                <Typography>{post.content}</Typography>
              </Grid>
            ))} */}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default UserProfile;
