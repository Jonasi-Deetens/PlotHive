/* eslint-disable react/prop-types */
import "../assets/styles/components/Tinymce/tinymce.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { UserContext } from "../providers/UserContext";
import { BookContext } from "../providers/BookContext";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

const Tinymce = ({ bookId }) => {
  const editorRef = useRef(null);
  const { authUser, user } = useContext(UserContext);
  const { addContributionToBook } = useContext(BookContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const isAuthorized = async () => {
      try {
        await authUser();
      } catch (error) {
        console.error("Failed to authenticate");
      }
    };

    isAuthorized();
  }, [authUser, user]);

  const submit = async () => {
    setIsModalOpen(false);
    if (editorRef.current && user) {
      const content = editorRef.current.getContent();

      const postData = {
        text: content,
        user_id: user,
      };
      try {
        const response = await fetch(
          "https://plothiveserver1-1y57tl0h.b4a.run/api/contributions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          await addContributionToBook(bookId, data);
        } else {
          console.error("Failed to create post");
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const handleFormSubmit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyUp = () => {
    const content = editorRef.current.getContent();
    const charCount = content.replace(/<\/?[^>]+(>|$)/g, "").length;
    if (charCount >= 1200) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Editor
        apiKey="uwgk832t4gctz0whow29vutbfw5cjft0la1kkfbaw78xqfwe"
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editorRef.current.on("keyup", handleKeyUp);
        }}
        initialValue=""
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
          content_style:
            "p { color: #fefefe; font-family: 'Libre Baskerville', serif; font-size: 1.2rem; } body { background-color: #414042; }",
          placeholder: "Start writing your story here!",
          readonly: isDisabled,
        }}
      />
      <button className="editor-submit" onClick={handleFormSubmit}>
        Submit
      </button>
      <Link to={"/read?id=" + bookId}>
        <button className="editor-submit">Read</button>
      </Link>
      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={submit}
      />
    </>
  );
};

export default Tinymce;
