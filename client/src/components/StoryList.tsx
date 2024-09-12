import { Link } from "react-router-dom";
import formatDate from "../utils/dateFormatter";

function StoryList({ stories }) {
  return (
    <ul className="story-list px-1 py-2">
      {stories?.map((s, index: number) => (
        <li key={s.story_id}>
          <Link
            className="flex space-x-4 items-start px-2 py-4 hover:bg-gray-100 transition duration-300"
            to={`/story/${s.story_id}`}
          >
            {/* Numbering */}
            <div className="text-2xl font-semibold text-gray-500">
              {index + 1}
            </div>

            {/* Content  */}
            <div className="flex-1">
              <h2 className="text-lg font-medium text-blue-600 hover:underline">
                {s.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                @{s.username}{" "}
                <span className="text-xs">{formatDate(s.created_at)}</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default StoryList;
