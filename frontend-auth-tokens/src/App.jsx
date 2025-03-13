import './App.css';

const newEvent = {
  title: 'Wacken',
  description: 'Metal Festival',
  date: '2025-06-13T08:26:49.455Z',
  location: 'Wacken Open Air Gelände, 25596 Wacken, Norderstraße',
  latitude: 9.3676042,
  longitude: 54.0279653,
  organizerId: 1,
};

function App() {
  const login = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'user@example.com',
          password: 'password123',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      console.log(data);

      localStorage.setItem('token', data.token);

      // Axios Variante
      // const { data } = await axios.post('http://localhost:3001/api/auth/login', {
      //   email: 'user@example.com',
      //   password: 'password123',
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  const postEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw Error('No User');

      const res = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const data = await res.json();
      console.log(data);

      // Axios Variante
      // const { data } = await axios.post(
      //   'http://localhost:3001/api/events', newEvent,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //        Authorization: 'Bearer ' + token,
      //     },
      //   }
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={login}>Login</button>
      <button onClick={postEvent}>Post new Event</button>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default App;
