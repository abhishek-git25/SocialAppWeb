{

  //   method to submit post form data using ajax

  let createPost = function () {
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function (e) {
      e.preventDefault()
      $.ajax({
        type: 'post',
        url: '/post/create',
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = displayPost(data.data.post)
          $('#post-container > ul').prepend(newPost);
          deletePost($(' .delete-post-button', newPost))
        }, error: function (error) {
          console.log(error.responseText);
        }
      })
    })
  }

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          // ${`#post-${data.post_id}`}.remove();
          $(`#post-${data.data.post_id}`).remove();
        }, error: function (error) {
          console.log(error.responseText);
        }
      })
    })
  }








  let displayPost = function (post) {

    return $(`<li id="post-${post._id}">
        <p>
                <a href="/post/destroy/${post._id}">Delete</a>
                   ${post.content}
        </p>
    
        <small>
            ${post.user.name}
        </small>
        <div class="post-comments">
           
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Add Comment..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
            
                    <div class="post-commments-list">
                        <ul id="post-comments-${post._id}">
        
                        </ul>
    
                    </div>
        </div>`)

  }
  createPost();
}


let convertPostsToAjax = function () {
  $('#posts-list-container>ul>li').each(function () {
    let self = $(this);
    let deleteButton = $(' .delete-post-button', self);
    deletePost(deleteButton);

    // get the post's id by splitting the id attribute
    let postId = self.prop('id').split("-")[1]
    new PostComments(postId);
  });
}




convertPostsToAjax();
