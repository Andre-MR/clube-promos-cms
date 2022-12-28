async function getAmazonProduct(amazonParameter: string): Promise<any> {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_MAIN_URL
    }/api/queries/amazon?${new URLSearchParams({
      AmazonParameter: amazonParameter,
    })}`,
    {
      method: "GET",
      cache: "default",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  );

  const responseJSON = await response.json();

  return responseJSON;
}

export { getAmazonProduct };
