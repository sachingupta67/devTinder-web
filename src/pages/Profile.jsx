import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/profile/view', {
          withCredentials: true
        });
        setProfile(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        {profile && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img 
                src={profile.photoUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600">{profile.emailId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Age</h3>
                <p className="text-gray-700">{profile.age}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Gender</h3>
                <p className="text-gray-700 capitalize">{profile.gender}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">About</h3>
              <p className="text-gray-700">{profile.about}</p>
            </div>

            {profile.skills && profile.skills.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;