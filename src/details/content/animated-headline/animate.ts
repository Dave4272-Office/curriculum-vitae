//loading bar effect
const barAnimationDelay = 3800;
const barWaiting = barAnimationDelay - 3000;
//3000 is the duration of the transition on the loading bar - set in the scss/css file

function animateHeadline($headlines: JQuery<HTMLElement>) {
  let duration = barAnimationDelay;
  $headlines.each(function () {
    var headline = $(this);

    //loading bar
    setTimeout(function () {
      headline.find(".cd-words-wrapper").addClass("is-loading");
    }, barWaiting);

    //trigger animation
    setTimeout(function () {
      hideWord(headline.find(".is-visible").eq(0));
    }, duration);
  });
}

function hideWord($word: JQuery<HTMLElement>) {
  var nextWord = takeNext($word);

  $word.parents(".cd-words-wrapper").removeClass("is-loading");
  switchWord($word, nextWord);

  setTimeout(function () {
    hideWord(nextWord);
  }, barAnimationDelay);

  setTimeout(function () {
    $word.parents(".cd-words-wrapper").addClass("is-loading");
  }, barWaiting);
}

function takeNext($word: JQuery<HTMLElement>) {
  return !$word.is(":last-child")
    ? $word.next()
    : $word.parent().children().eq(0);
}

function switchWord(
  $oldWord: JQuery<HTMLElement>,
  $newWord: JQuery<HTMLElement>
) {
  $oldWord.removeClass("is-visible").addClass("is-hidden");
  $newWord.removeClass("is-hidden").addClass("is-visible");
}

export function Animate() {
  animateHeadline($(".cd-headline"));
}
