import Tinymce from "../components/Tinymce";
import Contribution from "../components/Contribution";

const Write = () => {
  return (
    <div className="write-page">
      <h1>
        “Jonasi stept out of the elevator with blood all over his face, ...”
      </h1>
      <div className="write-book">
        <div className="write-book-contributions">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae unde
            laudantium nisi velit officiis consectetur facere tempore hic quasi,
            est aspernatur at placeat in odio fugiat eius! Cumque, quae
            molestiae. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Cum, culpa iste nulla accusamus distinctio rerum at amet veniam
            quas, fuga, minus deserunt magni inventore voluptas? In quasi
            repellat repellendus fuga? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Veniam quis aliquid voluptates optio enim
            obcaecati ratione corrupti commodi deleniti! Doloribus, illo
            praesentium impedit minima iusto necessitatibus eum tenetur dolorem
            architecto.
          </p>
          <Tinymce />
        </div>
        <div className="write-current-contributions">
          <Contribution />
        </div>
      </div>
    </div>
  );
};

export default Write;
