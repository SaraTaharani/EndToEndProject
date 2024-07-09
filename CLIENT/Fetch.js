
export function getData(type) {
   return fetch(`http://localhost:3000/${type}`, {
      headers: {
         'Content-Type': 'application/json',
      }, credentials: "include",

   })
      .then((res) => {
         if (!res.ok) {
            throw new Error('Network response was not ok');
         }
         return res.json();
      })
      .then((data) => {
         return data;
      })
      .catch((error) =>{ console.error(`Error fetching ${type}:`, error)
      return null});
}

export async function getDataByEmail(type, email) {
   try {
      const response = await fetch(`http://localhost:3000/${type}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      return data;
   } catch (error) {
      alert(error.message || 'An error occurred');
      console.error(`Error fetching ${type}:`, error);
      return null
   }
}

export function getDataById(type, id) {
   return fetch(`http://localhost:3000/${type}/${id}`, {
      headers: {
         'Content-Type': 'application/json',
      }, credentials: "include",
   })
      .then((res) => res.json())
      .then((data) => {
         return data;
      })
      .catch((error) => {console.error(`Error fetching ${type}:`, error)
      return null});
}

export function postNewObject(type, object) {
   console.log(type)
   console.log(object)
   console.log(`http://localhost:3000/${type}`)
   return fetch(`http://localhost:3000/${type}`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      }, credentials: "include",
      body: JSON.stringify(object),
   })
      .then(res => res.json())
      .then(data => {
         if (data.ok) {
            return data;
         }
         else {
            throw new Error('I did not succed to post the object  ')
         }

      })
      .catch(err => {console.error(`Error posting ${type}:`, err)
      return null});
}

export function updateObject(type, id, object) {

   return fetch(`http://localhost:3000/${type}/${id}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      }, credentials: "include",
      body: JSON.stringify({
         ...object,
         id: id,
      }),
   })
      .then(res => res.json())
      .then(data => {
         return data;
      })
      .catch(err => {console.error(`Error updating ${type}:`, err)
      return null});
}


export function deleteObject(type, id) {
   console.log(`${type}, ${id}`)
   return fetch(`http://localhost:3000/${type}/${id}`, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
      }, credentials: "include",
   })
      .then(res => res.json())
      .then(data => {
         return data;
      })
      .catch(err => {
         console.error(`Error delete ${type}:`, err)
         return null
      });
}


export function getOrdersOfClient(userId) {
   return fetch(`http://localhost:3000/myDetails/${userId}/orders`, {
      headers: {
         'Content-Type': 'application/json',
      }, credentials: "include",
   })
      .then((res) => res.json())
      .then((data) => {
         return data;
      })
      .catch((error) => {
         console.error(`Error fetching orders of client:`, error)
         return null
      });
}

export function getTurnsOfClient(userId) {
   return fetch(`http://localhost:3000/myDetails/${userId}/turns`, {
      headers: {
         'Content-Type': 'application/json',
      }, credentials: "include",
   })
      .then((res) => res.json())
      .then((data) => {
         return data;
      })

      .catch((error) => {
         console.error(`Error fetching orders of client:`, error)
         return null
      });
}