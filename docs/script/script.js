function toggleNav()
{
    const nav = document.getElementById('sidebar');
    nav.classList.toggle('hidden-nav');
}

function toggleSubNav(element)
{
    const subnav = document.getElementById(element);
    subnav.classList.toggle('hidden-subnav');
}

function flipArrow(element)
{
    element.classList.toggle('flipped');
}