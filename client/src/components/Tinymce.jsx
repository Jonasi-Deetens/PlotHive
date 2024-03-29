/* eslint-disable react/prop-types */
import '../assets/styles/components/Tinymce/tinymce.css'
import { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { UserContext } from "../providers/UserContext";
import { BookContext } from "../providers/BookContext";
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const Tinymce = ({ bookId }) => {
  const editorRef = useRef(null);
  const { authUser, user } = useContext(UserContext);
  const { addContributionToBook } = useContext(BookContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (editorRef.current && user) {
      const content = editorRef.current.getContent();

      const postData = {
        text: content,
        user_id: user,
      };
      try {
        const response = await fetch(
          "https://plothiveserver-9kh2sv0d.b4a.run/api/contributions",
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
          console.log("Post created successfully");
        } else {
          console.error("Failed to create post");
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Editor
        apiKey="uwgk832t4gctz0whow29vutbfw5cjft0la1kkfbaw78xqfwe"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Start writing your story here!</p>"
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
          toolbar: "bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
            // "undo redo | blocks | " +
            // "bold italic forecolor | alignleft aligncenter " +
            // "alignright alignjustify | bullist numlist outdent indent | " +
            // "removeformat | help",
          content_style: "p { color: #fefefe; font-family: 'Libre Baskerville', serif; font-size: 1.2rem; } body { background-color: #414042; }"
        }}
      />
      <button className='editor-submit' onClick={handleFormSubmit}>Submit</button>
      <Link to={"/read?id=" + bookId}><button className='editor-submit'>Read</button></Link>
      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={submit}
      />
    </>
  );
};

export default Tinymce;
