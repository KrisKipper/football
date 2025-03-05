import { findPos, hasWindow, onAnimationEnd, onTransitionEnd, prepend, safeNum } from './utils';
export const modal = (zuck) => {
    const id = zuck.id;
    let modalZuckContainer = document.querySelector('#zuck-modal');
    if (!modalZuckContainer && !zuck.hasModal) {
        zuck.hasModal = true;
        modalZuckContainer = document.createElement('div');
        modalZuckContainer.id = 'zuck-modal';
        if (zuck.option('cubeEffect')) {
            modalZuckContainer.className = 'with-cube';
        }
        modalZuckContainer.innerHTML = '<div id="zuck-modal-content"></div>';
        modalZuckContainer.style.display = 'none';
        modalZuckContainer.setAttribute('tabIndex', '1');
        modalZuckContainer.onkeyup = ({ keyCode }) => {
            const code = keyCode;
            if (code === 27) {
                modalZuckContainer.modal.close();
            }
            else if (code === 13 || code === 32) {
                modalZuckContainer.modal.next();
            }
        };
        if (zuck.option('openEffect')) {
            modalZuckContainer === null || modalZuckContainer === void 0 ? void 0 : modalZuckContainer.classList.add('with-effects');
        }
        if (zuck.option('rtl')) {
            modalZuckContainer === null || modalZuckContainer === void 0 ? void 0 : modalZuckContainer.classList.add('rtl');
        }
        onTransitionEnd(modalZuckContainer, () => {
            const modalContent = document.querySelector('#zuck-modal-content');
            if (modalZuckContainer === null || modalZuckContainer === void 0 ? void 0 : modalZuckContainer.classList.contains('closed')) {
                if (modalContent) {
                    modalContent.innerHTML = '';
                }
                modalZuckContainer.style.display = 'none';
                modalZuckContainer.classList.remove('closed');
                modalZuckContainer.classList.remove('animated');
            }
        });
        document.body.appendChild(modalZuckContainer);
    }
    const translate = function (element, to, duration, ease) {
        var _a;
        if (to === undefined || (to && isNaN(to))) {
            return;
        }
        const direction = to > 0 ? 1 : -1;
        const modalWidth = ((_a = document.querySelector('#zuck-modal')) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 1;
        const to3d = (Math.abs(to) / modalWidth) * 90 * direction;
        if (zuck.option('cubeEffect')) {
            const scaling = to3d === 0 ? 'scale(0.95)' : 'scale(0.930,0.930)';
            const modalContent = document.querySelector('#zuck-modal-content');
            if (modalContent) {
                modalContent.style.transform = scaling;
            }
            if (to3d < -90 || to3d > 90) {
                return false;
            }
        }
        const transform = !zuck.option('cubeEffect')
            ? `translate3d(${to}px, 0, 0)`
            : `rotateY(${to3d}deg)`;
        if (element) {
            if (ease) {
                element.style.transitionTimingFunction = ease;
            }
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = transform;
        }
    };
    const fullScreen = function (elem, cancel) {
        const anyDocument = document;
        const anyElem = elem;
        try {
            if (cancel) {
                if (anyDocument.fullscreenElement ||
                    anyDocument.webkitFullscreenElement ||
                    anyDocument.mozFullScreenElement ||
                    anyDocument.msFullscreenElement) {
                    if (anyDocument.exitFullscreen) {
                        anyDocument.exitFullscreen().catch(() => { });
                    }
                    else if (anyDocument.mozCancelFullScreen) {
                        anyDocument.mozCancelFullScreen().catch(() => { });
                    }
                }
            }
            else {
                if (anyElem.requestFullscreen) {
                    anyElem.requestFullscreen();
                }
                else if (anyElem.msRequestFullscreen) {
                    anyElem.msRequestFullscreen();
                }
                else if (anyElem.mozRequestFullScreen) {
                    anyElem.mozRequestFullScreen();
                }
                else if (anyElem.webkitRequestFullscreen) {
                    anyElem.webkitRequestFullscreen();
                }
            }
        }
        catch (e) {
            console.warn("[Zuck.js] Can't access fullscreen");
        }
    };
    const moveStoryItem = (direction) => {
        const modalContainer = document.querySelector('#zuck-modal');
        const modalSlider = document.querySelector(`#zuck-modal-slider-${id}`);
        let target = '';
        let useless = '';
        let transform = 0;
        const slideItems = {
            previous: document.querySelector('#zuck-modal .story-viewer.previous'),
            next: document.querySelector('#zuck-modal .story-viewer.next'),
            viewing: document.querySelector('#zuck-modal .story-viewer.viewing')
        };
        if ((!slideItems.previous && !direction) ||
            (!slideItems.next && direction)) {
            if (!zuck.option('rtl')) {
                return false;
            }
        }
        if (!direction) {
            target = 'previous';
            useless = 'next';
        }
        else {
            target = 'next';
            useless = 'previous';
        }
        const transitionTime = 600;
        if (zuck.option('cubeEffect')) {
            if (target === 'previous') {
                transform = safeNum(modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.slideWidth);
            }
            else if (target === 'next') {
                transform = safeNum(modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.slideWidth) * -1;
            }
        }
        else {
            transform = findPos(slideItems[target])[0] * -1;
        }
        translate(modalSlider, transform, transitionTime, null);
        setTimeout(() => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            // set page data when transition complete
            if (zuck.option('rtl')) {
                const tmp = target;
                target = useless;
                useless = tmp;
            }
            if (target !== '' && slideItems[target] && useless !== '') {
                const currentStory = (_a = slideItems[target]) === null || _a === void 0 ? void 0 : _a.getAttribute('data-story-id');
                zuck.internalData.currentStory = currentStory;
                const oldStory = document.querySelector(`#zuck-modal .story-viewer.${useless}`);
                if (oldStory) {
                    (_b = oldStory === null || oldStory === void 0 ? void 0 : oldStory.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(oldStory);
                }
                if (slideItems.viewing) {
                    (_c = slideItems.viewing) === null || _c === void 0 ? void 0 : _c.classList.add('stopped');
                    (_d = slideItems.viewing) === null || _d === void 0 ? void 0 : _d.classList.add(useless);
                    (_e = slideItems.viewing) === null || _e === void 0 ? void 0 : _e.classList.remove('viewing');
                }
                if (slideItems[target]) {
                    (_f = slideItems[target]) === null || _f === void 0 ? void 0 : _f.classList.remove('stopped');
                    (_g = slideItems[target]) === null || _g === void 0 ? void 0 : _g.classList.remove(target);
                    (_h = slideItems[target]) === null || _h === void 0 ? void 0 : _h.classList.add('viewing');
                }
                const newTimelineItem = getStoryMorningGlory(target);
                if (newTimelineItem) {
                    createStoryViewer(newTimelineItem, target);
                }
                const storyId = zuck.internalData.currentStory;
                const storyIndex = zuck.findStoryIndex(storyId);
                const storyWrap = document.querySelector(`#zuck-modal [data-story-id="${storyId}"]`);
                let items = undefined;
                if (storyWrap) {
                    items = storyWrap.querySelectorAll('[data-index].active');
                    const duration = (_j = items === null || items === void 0 ? void 0 : items[0]) === null || _j === void 0 ? void 0 : _j.firstElementChild;
                    zuck.data[storyIndex].currentItem = safeNum((_k = items === null || items === void 0 ? void 0 : items[0]) === null || _k === void 0 ? void 0 : _k.getAttribute('data-index'));
                    if (items === null || items === void 0 ? void 0 : items[0]) {
                        items[0].innerHTML = zuck.template('viewerItemPointerProgress')(duration.style.cssText);
                        onAnimationEnd(duration, () => {
                            zuck.nextItem();
                        });
                    }
                }
                translate(modalSlider, 0, 0, null);
                if (items) {
                    const storyViewer = document.querySelector(`#zuck-modal .story-viewer[data-story-id="${currentStory}"]`);
                    zuck.playVideoItem(storyViewer, items);
                }
                zuck.callback('onView')(zuck.internalData.currentStory);
            }
        }, transitionTime + 50);
    };
    const createStoryViewer = function (storyData, className, forcePlay) {
        const modalSlider = document.querySelector(`#zuck-modal-slider-${id}`);
        const storyItems = storyData['items'];
        storyData.time = storyItems && (storyItems === null || storyItems === void 0 ? void 0 : storyItems[0]['time']);
        let htmlItems = '';
        let pointerItems = '';
        const storyId = storyData['id'];
        const slides = document.createElement('div');
        const currentItem = storyData['currentItem'] || 0;
        const exists = document.querySelector(`#zuck-modal .story-viewer[data-story-id="${storyId}"]`);
        if (exists) {
            return false;
        }
        slides.className = 'slides';
        storyItems.forEach((item, i) => {
            if (currentItem > i) {
                storyData.items[i].seen = true;
                item.seen = true;
            }
            pointerItems += zuck.template('viewerItemPointer')(i, currentItem, item);
            htmlItems += zuck.template('viewerItemBody')(i, currentItem, item);
        });
        slides.innerHTML = htmlItems;
        const video = slides.querySelector('video');
        const addMuted = function (video) {
            if (video.muted) {
                storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.add('muted');
            }
            else {
                storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.remove('muted');
            }
        };
        if (video) {
            video.onwaiting = () => {
                if (video.paused) {
                    storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.add('paused');
                    storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.add('loading');
                }
            };
            video.onplay = () => {
                addMuted(video);
                storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.remove('stopped');
                storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.remove('paused');
                storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.remove('loading');
            };
            video.onload =
                video.onplaying =
                    video.oncanplay =
                        () => {
                            addMuted(video);
                            storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.remove('loading');
                        };
            video.onvolumechange = () => {
                addMuted(video);
            };
        }
        const storyViewerWrap = document.createElement('div');
        storyViewerWrap.innerHTML = zuck.template('viewerItem')(storyData, storyItems[currentItem]);
        const storyViewer = storyViewerWrap.firstElementChild;
        const storyViewerPointerWrap = storyViewer.querySelector('.slides-pointers .wrap');
        storyViewer.className = `story-viewer muted ${className} ${!forcePlay ? 'stopped' : ''} ${zuck.option('backButton') ? 'with-back-button' : ''}`;
        if (storyId) {
            storyViewer.setAttribute('data-story-id', storyId);
        }
        if (storyViewerPointerWrap) {
            storyViewerPointerWrap.innerHTML = pointerItems;
        }
        storyViewer
            .querySelectorAll('.close, .back')
            .forEach((el) => {
            el.onclick = (e) => {
                e.preventDefault();
                modalZuckContainer.modal.close();
            };
        });
        storyViewer.appendChild(slides);
        if (className === 'viewing') {
            zuck.playVideoItem(storyViewer, storyViewer.querySelectorAll(`[data-index="${currentItem}"].active`), undefined);
        }
        storyViewer
            .querySelectorAll('.slides-pointers [data-index] > .progress')
            .forEach((el) => {
            onAnimationEnd(el, () => {
                zuck.nextItem(undefined);
            });
        });
        if (!modalSlider) {
            return;
        }
        if (className === 'previous') {
            prepend(modalSlider, storyViewer);
        }
        else {
            modalSlider.appendChild(storyViewer);
        }
    };
    const createStoryTouchEvents = function (modalSlider) {
        const modalContainer = document.querySelector('#zuck-modal');
        const enableMouseEvents = true;
        let position = null;
        let touchOffset = null;
        let isScrolling = null;
        let delta = null;
        let timer = undefined;
        let nextTimer = undefined;
        const touchStart = function (event) {
            const storyViewer = document.querySelector('#zuck-modal .viewing');
            const storyViewerWrap = document.querySelector('#zuck-modal .story-viewer');
            if (event.target.nodeName === 'A') {
                return;
            }
            const touches = event.touches
                ? event.touches[0]
                : event;
            const pos = findPos(document.querySelector('#zuck-modal .story-viewer.viewing'));
            if (modalContainer) {
                modalContainer.slideWidth = storyViewerWrap === null || storyViewerWrap === void 0 ? void 0 : storyViewerWrap.offsetWidth;
                modalContainer.slideHeight = storyViewerWrap === null || storyViewerWrap === void 0 ? void 0 : storyViewerWrap.offsetHeight;
            }
            position = {
                x: pos[0],
                y: pos[1]
            };
            const clientX = touches.clientX;
            const clientY = touches.clientY;
            touchOffset = {
                x: clientX,
                y: clientY,
                time: Date.now(),
                valid: true
            };
            if (clientY < 80 || clientY > safeNum(modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.slideHeight) - 80) {
                touchOffset.valid = false;
            }
            else {
                event.preventDefault();
                isScrolling = undefined;
                delta = {};
                if (enableMouseEvents) {
                    modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.addEventListener('mousemove', touchMove);
                    modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.addEventListener('mouseup', touchEnd);
                    modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.addEventListener('mouseleave', touchEnd);
                }
                modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.addEventListener('touchmove', touchMove);
                modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.addEventListener('touchend', touchEnd);
                if (storyViewer) {
                    storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.add('paused');
                }
                zuck.pauseVideoItem();
                timer = setTimeout(() => {
                    if (storyViewer) {
                        storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.add('longPress');
                    }
                }, 600);
                nextTimer = setTimeout(() => {
                    clearInterval(nextTimer);
                    nextTimer = undefined;
                }, 250);
            }
        };
        const touchMove = function (event) {
            const touches = event.touches
                ? event.touches[0]
                : event;
            const clientX = touches.clientX;
            const clientY = touches.clientY;
            if (touchOffset && touchOffset.valid) {
                delta = {
                    x: clientX - touchOffset.x,
                    y: clientY - touchOffset.y
                };
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y));
                }
                if (!isScrolling && touchOffset) {
                    event.preventDefault();
                    translate(modalSlider, safeNum(position === null || position === void 0 ? void 0 : position.x) + safeNum(delta === null || delta === void 0 ? void 0 : delta.x), 0, null);
                }
            }
        };
        const touchEnd = (event) => {
            const storyViewer = document.querySelector('#zuck-modal .viewing');
            const lastTouchOffset = touchOffset;
            const duration = touchOffset ? Date.now() - touchOffset.time : undefined;
            const isValid = (Number(duration) < 300 && Math.abs(safeNum(delta === null || delta === void 0 ? void 0 : delta.x)) > 25) ||
                Math.abs(safeNum(delta === null || delta === void 0 ? void 0 : delta.x)) > safeNum(modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.slideWidth) / 3;
            const direction = safeNum(delta === null || delta === void 0 ? void 0 : delta.x) < 0;
            const index = direction
                ? document.querySelector('#zuck-modal .story-viewer.next')
                : document.querySelector('#zuck-modal .story-viewer.previous');
            const isOutOfBounds = (direction && !index) || (!direction && !index);
            if (touchOffset && !touchOffset.valid) {
            }
            else {
                if (delta) {
                    if (!isScrolling) {
                        if (isValid && !isOutOfBounds) {
                            moveStoryItem(direction);
                        }
                        else {
                            translate(modalSlider, safeNum(position === null || position === void 0 ? void 0 : position.x), 300);
                        }
                    }
                    touchOffset = undefined;
                    if (enableMouseEvents) {
                        modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.removeEventListener('mousemove', touchMove);
                        modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.removeEventListener('mouseup', touchEnd);
                        modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.removeEventListener('mouseleave', touchEnd);
                    }
                    modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.removeEventListener('touchmove', touchMove);
                    modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.removeEventListener('touchend', touchEnd);
                }
                const video = zuck.internalData.currentVideoElement;
                if (timer) {
                    clearInterval(timer);
                }
                if (storyViewer) {
                    zuck.playVideoItem(storyViewer, storyViewer.querySelectorAll('.active'), undefined);
                    storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.remove('longPress');
                    storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.remove('paused');
                }
                if (nextTimer) {
                    clearInterval(nextTimer);
                    nextTimer = undefined;
                    const navigateItem = () => {
                        if (!direction) {
                            if (safeNum(lastTouchOffset === null || lastTouchOffset === void 0 ? void 0 : lastTouchOffset.x) > document.body.offsetWidth / 3 ||
                                !zuck.option('previousTap')) {
                                if (zuck.option('rtl')) {
                                    zuck.navigateItem('previous', event);
                                }
                                else {
                                    zuck.navigateItem('next', event);
                                }
                            }
                            else {
                                if (zuck.option('rtl')) {
                                    zuck.navigateItem('next', event);
                                }
                                else {
                                    zuck.navigateItem('previous', event);
                                }
                            }
                        }
                    };
                    const storyViewerViewing = document.querySelector('#zuck-modal .viewing');
                    if (storyViewerViewing && video) {
                        if (storyViewerViewing === null || storyViewerViewing === void 0 ? void 0 : storyViewerViewing.classList.contains('muted')) {
                            zuck.unmuteVideoItem(video, storyViewerViewing);
                        }
                        else {
                            navigateItem();
                        }
                    }
                    else {
                        navigateItem();
                        return false;
                    }
                }
            }
        };
        modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.addEventListener('touchstart', touchStart);
        if (enableMouseEvents) {
            modalSlider === null || modalSlider === void 0 ? void 0 : modalSlider.addEventListener('mousedown', touchStart);
        }
    };
    const getStoryMorningGlory = function (what) {
        // my wife told me to stop singing Wonderwall. I SAID MAYBE.
        const currentStory = zuck.internalData.currentStory;
        if (currentStory && what !== '') {
            const element = document.querySelector(`#${id} [data-id="${currentStory}"]`);
            const foundStory = what === 'previous'
                ? element.previousElementSibling
                : element.nextElementSibling;
            if (foundStory) {
                const storyId = foundStory.getAttribute('data-id');
                const storyIndex = zuck.findStoryIndex(storyId);
                const data = zuck.data[storyIndex] || false;
                return data;
            }
        }
        return false;
    };
    const show = (storyId) => {
        const modalContainer = document.querySelector('#zuck-modal');
        const callback = function () {
            const modalContent = document.querySelector('#zuck-modal-content');
            modalContent.innerHTML = `<div id="zuck-modal-slider-${id}" class="slider"></div>`;
            if (!modalContent || !storyId) {
                return;
            }
            const storyIndex = zuck.findStoryIndex(storyId);
            const storyData = zuck.data[storyIndex];
            const currentItem = storyData.currentItem || 0;
            const modalSlider = document.querySelector(`#zuck-modal-slider-${id}`);
            createStoryTouchEvents(modalSlider);
            zuck.internalData.currentStory = storyId;
            storyData.currentItem = currentItem;
            if (zuck.option('backNative') && hasWindow()) {
                window.location.hash = `#!${id}`;
            }
            const previousItemData = getStoryMorningGlory('previous');
            if (previousItemData) {
                createStoryViewer(previousItemData, 'previous');
            }
            createStoryViewer(storyData, 'viewing', true);
            const nextItemData = getStoryMorningGlory('next');
            if (nextItemData) {
                createStoryViewer(nextItemData, 'next');
            }
            if (zuck.option('autoFullScreen')) {
                modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.classList.add('fullscreen');
            }
            const tryFullScreen = () => {
                if ((modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.classList.contains('fullscreen')) &&
                    zuck.option('autoFullScreen') &&
                    document.body.offsetWidth <= 1024) {
                    fullScreen(modalContainer);
                }
                modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.focus();
            };
            const storyViewerWrap = document.querySelector('#zuck-modal .story-viewer');
            if (zuck.option('openEffect') && modalContainer) {
                const storyEl = document.querySelector(`#${id} [data-id="${storyId}"] .item-preview`);
                const pos = findPos(storyEl);
                modalContainer.style.marginLeft = `${pos[0] + safeNum(storyEl === null || storyEl === void 0 ? void 0 : storyEl.offsetWidth) / 2}px`;
                modalContainer.style.marginTop = `${pos[1] + safeNum(storyEl === null || storyEl === void 0 ? void 0 : storyEl.offsetHeight) / 2}px`;
                modalContainer.style.display = 'block';
                modalContainer.slideWidth = (storyViewerWrap === null || storyViewerWrap === void 0 ? void 0 : storyViewerWrap.offsetWidth) || 0;
                setTimeout(() => {
                    modalContainer === null || modalContainer === void 0 ? void 0 : modalContainer.classList.add('animated');
                }, 10);
                setTimeout(() => {
                    tryFullScreen();
                }, 300); // because effects
            }
            else {
                if (modalContainer) {
                    modalContainer.style.display = 'block';
                    modalContainer.slideWidth = (storyViewerWrap === null || storyViewerWrap === void 0 ? void 0 : storyViewerWrap.offsetWidth) || 0;
                }
                tryFullScreen();
            }
            zuck.callback('onView')(storyId);
        };
        zuck.callback('onOpen')(storyId, callback);
    };
    const next = () => {
        const callback = function () {
            const lastStory = zuck.internalData.currentStory;
            const lastStoryIndex = zuck.findStoryIndex(lastStory);
            const lastStoryTimelineElement = document.querySelector(`#${id} [data-id="${lastStory}"]`);
            if (lastStoryTimelineElement) {
                lastStoryTimelineElement === null || lastStoryTimelineElement === void 0 ? void 0 : lastStoryTimelineElement.classList.add('seen');
                zuck.data[lastStoryIndex].seen = true;
                zuck.internalData.seenItems[lastStory] = true;
                zuck.saveLocalData('seenItems', zuck.internalData.seenItems);
                zuck.updateStorySeenPosition();
            }
            const stories = document.querySelector('#zuck-modal .story-viewer.next');
            if (!stories) {
                modalZuckContainer.modal.close();
            }
            else {
                if (zuck.option('rtl')) {
                    moveStoryItem(false);
                }
                else {
                    moveStoryItem(true);
                }
            }
        };
        zuck.callback('onEnd')(zuck.internalData.currentStory, callback);
    };
    const close = () => {
        const modalContainer = document.querySelector('#zuck-modal');
        const modalContent = document.querySelector('#zuck-modal-content');
        const callback = function () {
            if (zuck.option('backNative') && hasWindow()) {
                window.location.hash = '';
            }
            fullScreen(modalContainer, true);
            if (modalContainer) {
                if (zuck.option('openEffect')) {
                    modalContainer.classList.add('closed');
                }
                else {
                    if (modalContent) {
                        modalContent.innerHTML = '';
                    }
                    modalContainer.style.display = 'none';
                }
            }
        };
        zuck.callback('onClose')(zuck.internalData.currentStory, callback);
    };
    modalZuckContainer.modal = {
        show,
        next,
        close
    };
    return modalZuckContainer.modal;
};
