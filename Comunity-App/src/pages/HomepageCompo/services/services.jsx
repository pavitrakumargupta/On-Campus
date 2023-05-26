import React from "react";
import "./services.css";
import { useNavigate } from "react-router-dom";
const Services = () => {
  const navigate = useNavigate();

  const apps = [
    {
      name: "Messages",
      url:"message",
      image:
        "https://icons-for-free.com/iconfiles/png/512/facebook+media+message+messenger+social+texting+icon-1320137114598336657.png",
    },
    {
      name: "News & Updates",
      url:"news",
      image:
        "https://user-images.githubusercontent.com/88044814/218287732-5bc54f2a-9002-49bb-8552-c161736e5276.png",
    },
    {
      name:"Blogs",
      url:"blogs",
      image:"https://cdn-icons-png.flaticon.com/512/6114/6114045.png"
    },
    {
      name: "Get Notes",
      url:"notes",
      image:
        "https://user-images.githubusercontent.com/88044814/218287797-dff1885b-3330-439d-bd86-2c08ba8916bd.png",
    },
    {
      name: "Ask Anything",
      url:"questions",
      image:
        "https://user-images.githubusercontent.com/88044814/218287808-c12974de-10fa-4f60-9417-83deebc98611.png",
    },
    {
      name: "Polls",
      url:"polls",
      image:
        "https://user-images.githubusercontent.com/88044814/218287818-1e37a19f-f745-4a7a-b3f3-56a9a5fbff93.png",
    },
    {
      name: "Saved",
      url:"saved",
      image:
        "https://user-images.githubusercontent.com/88044814/218287828-1f59fe25-43e6-4427-be9c-4d5b3f9b5e96.png",
    },
  ];
  const card_services = [
    {
      name: "Make Friends ",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSAxG9ci5bPg35QI0u18D-SHCOo3Q7m-jNcTaz1h9wY038H0Y1P",
    },
    {
      name: "Chat with People",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSTfFEXTiHH87dUVj2g4xm215tZPJniIUFW1EHESfOvOUI735Wi",
    },
    {
      name: "Join the Comunity",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTMkRlhJBA8j0rca0KlV3kcP30Hitx1jNMxzBslzOZXYP_rTnyo",
    },
  ];
  return (
    <div className="services">
      <div className="apps_out">
        <h2>How can we help you? </h2>
        <div className="apps">
          {apps.map((key) => (
            <div>
              <div>
                <img
                  onClick={() => {
                    navigate(`/${key.url}`);
                  }}
                  src={key.image}
                  alt=""
                />
              </div>

              <p>{key.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cards_services">
        {card_services.map((key) => (
          <div>
            <h4>{key.name}</h4>
            <img src={key.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
