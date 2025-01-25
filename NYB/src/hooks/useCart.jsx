import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { refetch, data: cart=[] } = useQuery({
      queryFn: async () => {
          const response = await fetch(`http://localhost:5000/carts`)
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
      },
  })
  return [cart, refetch]
};

export default useCart;