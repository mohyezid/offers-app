import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-ca-central-1.hygraph.com/v2/clvdtfl8j0j9v07vzx8eil5gh/master";
const getSlider = async () => {
  const query = gql`
    {
      slider {
        createdAt
        id
        publishedAt
        text
        updatedAt
        image {
          url
        }
      }
    }
  `;
  const response = await request(MASTER_URL, query);
  return response;
};

const getCategory = async () => {
  const query = gql`
    {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
  `;
  const response = await request(MASTER_URL, query);
  return response;
};

const getBusinessList = async () => {
  const query = gql`
    {
      businessLists {
        id
        name
        email
        contactPerson
        images {
          url
        }
        about
        address
        category {
          name
        }
      }
    }
  `;
  const response = await request(MASTER_URL, query);
  return response;
};

const getBusinessListByCategory = async (name) => {
  const query =
    gql`
    {
      businessLists(where: {category: {name: "` +
    name +
    `"}}) {
        id
        name
        email
        contactPerson
        images {
          url
        }
        about
        address
        category {
          name
        }
      }
    }
  `;
  const response = await request(MASTER_URL, query);
  return response;
};

const createBooking = async (data) => {
  const mutationQuery =
    gql`
  mutation createBooking {
     createBooking(
      data: {bookingStatus: Booked,
         buisness: {connect: {BusinessList: {id: "` +
    data.businessid +
    `"}}}, 
         date: "` +
    data.date +
    `", time: "` +
    data.time +
    `", userEmail: "` +
    data.email +
    `", userName: "` +
    data.name +
    `"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  
  `;
  const response = await request(MASTER_URL, mutationQuery);
  return response;
};

const getUserBooking = async (email) => {
  const query =
    gql`
    {
      bookings(orderBy: updatedAt_DESC, where: {userEmail: "` +
    email +
    `"}) {
        time
        userEmail
        userName
        bookingStatus
        date
        id
        buisness {
          ... on BusinessList {
            id
            email
            name
            contactPerson
            about
            address
            images {
              url
            }
          }
        }
      }
    }
  `;
  const response = await request(MASTER_URL, query);
  return response;
};

export default {
  getSlider,
  getCategory,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBooking,
};
