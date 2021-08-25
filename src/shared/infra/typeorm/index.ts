import { Connection, createConnection, getConnectionOptions } from "typeorm";

// ##   Utilizar quando aplicação estiver em container docker
export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test" ? "api_test" : defaultOptions.database,
    })
  );
};

// ##   Utilizar quando aplicação não estiver em container docker
// export default async (): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions();
//
//   return createConnection(
//     Object.assign(defaultOptions, {
//       database:
//         process.env.NODE_ENV === "test"
//           ? "api_test"
//           : defaultOptions.database,
//     })
//   );
// };
