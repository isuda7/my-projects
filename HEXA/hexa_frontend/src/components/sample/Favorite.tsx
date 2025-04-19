import { useFetcher } from "react-router-dom";

interface ContactProps {
  contact: {
    favorite?: boolean;
    // 필요에 따라 contact 객체의 다른 속성들도 여기에 추가
  };
}

export default function Favorite({ contact }: ContactProps) {
  const fetcher = useFetcher();

  // Initialize state based on contact.favorite
  let favorite = contact.favorite;

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={!favorite ? "true" : "false"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
