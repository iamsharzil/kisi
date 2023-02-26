import photos from '../config/images/photos.json';

const { results: images, total, pages } = photos;

const fetchData = (currentPage) =>
  new Promise((resolve) => {
    const resultsPerPage = Math.floor(total / pages);
    const startIndex = ((currentPage - 1) % total) * resultsPerPage;
    const endIndex = resultsPerPage * (currentPage % total);
    const data = images.slice(startIndex, endIndex);
    const hasMore = currentPage <= pages;
    resolve({ data, total, pages, hasMore });
  });

export default fetchData;
