const w = window,
      d = document

w.addEventListener("load", () => {
    const $profileImg = d.querySelector(".header__profile-img"),
          $profileArrow = d.querySelector(".header__profile-arrow"),
          $profileOpts = d.querySelector(".header__profile-opts")

    if($profileImg || $profileArrow) {
        $profileImg.addEventListener("click", () => {
            $profileOpts.classList.toggle("header__profile-opts-show")
        })
        $profileArrow.addEventListener("click", () => {
            $profileOpts.classList.toggle("header__profile-opts-show")
        })
    }
})