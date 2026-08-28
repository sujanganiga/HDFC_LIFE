export const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)



export const getDiscountedPrice=(product)=>{
    return product.price-(product.price*product.discountPercentage) / 100;
}


export const toTitleCase = (slug) => {


  // split by "-"
  // capitalize each word
  // join with spaces

  slug.split('-').map((w)=>{
    return w.charAt(0).toUpperCase() +slug.split(1);
  }).join(' ')




}

export const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) {
    return `added ${seconds} sec ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `added ${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  return `added ${hours} hour${hours === 1 ? "" : "s"} ago`;
};