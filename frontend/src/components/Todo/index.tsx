import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import axios from 'axios';

type Props = {
  user: any
}


export const Todo: React.FC<Props> = ({ user }) => {
    const [items, setItems] = useState<any>();
    const [itemVal, setItemVal] = useState<string>();

    const getItems = async () => {
      const data = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/getItems`, {
        headers: {
          "Authorization": `Bearer ${user && user.signInUserSession.idToken.jwtToken}`
        }
      })
      return data.data;
    }
    
    const createItem = async (todo: any) => {
      const data = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/createItem`, todo, {
        headers: {
          "Authorization": `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        }
      })
    }

    const handleSubmit = (e: any) => {
      e.preventDefault()
      if(itemVal === "") return;
      const todo = {
        id: uuidv4(),
        title: itemVal
      }
      createItem(todo).then(async (d) => {
        const data = await getItems();
        setItems(data);
      });
    }

    useEffect(() => {
      getItems().then((data) => {
        setItems(data);
      });
      
    }, [])

  return (
    <div>
      <form
        className="w-full lg:w-4/5 px-5 mx-auto space-y-6 py-12"
        onSubmit={(e) => {
          handleSubmit(e)
        }}
      >
        <div className="lg:grid lg:grid-cols-3 lg:gap-2 justify-between text-center">
          <input
            type="text"
            name="itemValue"
            value={itemVal}
            onChange={(e) => { setItemVal(e.target.value) }}
            placeholder="Enter Item"
            className="w-full col-span-2 my-6 lg:my-0 rounded text-primaryText focus:ring-primaryText focus:ring-6 focus:ring-offset-0 pl-4 font-semibold text-xl"
            style={{ height: "4.1rem" }}
          />
          <button
            type="submit"
            className="py-4 px-4 text-lg md:text-xl md:px-10 text-center font-semibold shadow-md text-primaryText border-2 border-alternateText hover:bg-alternateText"
          >
            Add Item
          </button>
        </div>
      </form>

      <ul>
        {items && items.map((item: any, i: number) => (
          <li key={i}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
