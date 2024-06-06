import { useEffect, useState } from "react"
import { fetchDetails } from "../../utils/dataManagement"
import Image from "next/image"
import Link from "next/link"
import Loading from "../loading/loading"
import { bestSelling } from "@/components/itemCard/itemCardIcons"


export default function SimilarProducts({ similarItems }) {

  const [product, setProduct] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      const data = await fetchDetails(similarItems.asin)
      setProduct(data)
      setLoading(false)
    }


    fetchProduct()
  }, [similarItems])


  if (product) {
    return (
      <div className="flex flex-col w-1/4 border items-center justify-around p-4 relative">
        <Image src={product?.product_photo} width={200} height={200} style={{ objectFit: 'contain' }} alt="Product Image" loading="lazy" />
        <Link href={`/${product?.product_asin || product?.asin}`} className="text-black line-clamp-3 text-lg mb-4 cursor-pointer hover:underline">{product?.product_title}</Link>
        <div className="flex w-full justify-around">
          <p className=" text-red-700 text-lg">{product?.product_price} $</p>
          <p className="text-gray-500">{product?.product_star_rating} <span className="text-gray-500 text-xs">{'(' + product?.product_num_ratings + ')'}</span></p>
          {product?.is_best_seller && bestSelling}
        </div>
      </div>
    )
  } else if (loading) {
    return (
      <div className="flex flex-row w-full justify-around items-center">
        <Loading />
      </div>
    )
  }

}