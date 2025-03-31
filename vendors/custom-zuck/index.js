import { generateId, hasWindow, prepend, safeNum, timeAgo } from './utils';
import { loadOptions } from './options';
import { modal as ZuckModal } from './modal';
export const Zuck = function (timeline, options) {
    if (!timeline.id) {
        timeline.setAttribute('id', generateId());
    }
    const id = timeline.id;
    const { option, callback: callbackOption, template: templateOption, language: languageOption } = loadOptions(options);
    const data = option('stories') || [];
    const internalData = {};
    /* data functions */
    const saveLocalData = function (key, data) {
        try {
            if (option('localStorage') && hasWindow()) {
                const keyName = `zuck-${id}-${key}`;
                window.localStorage[keyName] = JSON.stringify(data);
            }
        }
        catch (e) { }
    };
    const getLocalData = function (key) {
        if (option('localStorage') && hasWindow()) {
            const keyName = `zuck-${id}-${key}`;
            return window.localStorage[keyName]
                ? JSON.parse(window.localStorage[keyName])
                : undefined;
        }
        else {
            return undefined;
        }
    };
    internalData.seenItems = getLocalData('seenItems') || {};
    const playVideoItem = function (storyViewer, elements, unmute) {
        const itemElement = elements === null || elements === void 0 ? void 0 : elements[1];
        const itemPointer = elements === null || elements === void 0 ? void 0 : elements[0];
        if (!itemElement || !itemPointer) {
            return false;
        }
        const cur = internalData.currentVideoElement;
        if (cur) {
            cur.pause();
        }
        if (itemElement.getAttribute('data-type') === 'video') {
            const video = itemElement.querySelector('video');
            if (!video) {
                internalData.currentVideoElement = undefined;
                return false;
            }
            const setDuration = function () {
                let duration = video.duration;
                const itemPointerProgress = itemPointer.querySelector('.progress');
                if (+video.dataset.length) {
                    duration = +video.dataset.length;
                }
                if (duration && itemPointerProgress) {
                    itemPointerProgress.style.animationDuration = `${duration}s`;
                }
            };
            setDuration();
            video.addEventListener('loadedmetadata', setDuration);
            internalData.currentVideoElement = video;
            video.play();
            try {
                unmuteVideoItem(video, storyViewer);
            }
            catch (e) {
                console.warn('Could not unmute video', unmute);
            }
        }
        else {
            internalData.currentVideoElement = undefined;
        }
    };
    const findStoryIndex = function (id) {
        return data.findIndex((item) => item.id === id);
    };
    const pauseVideoItem = function () {
        const video = internalData.currentVideoElement;
        if (video) {
            try {
                video.pause();
            }
            catch (e) { }
        }
    };
    const unmuteVideoItem = function (video, storyViewer) {
        video.muted = false;
        video.volume = 1.0;
        video.removeAttribute('muted');
        video.play();
        if (video.paused) {
            video.muted = true;
            video.play();
        }
        if (storyViewer) {
            storyViewer === null || storyViewer === void 0 ? void 0 : storyViewer.classList.remove('paused');
        }
    };
    const parseItems = function (story, forceUpdate) {
        const storyId = (story === null || story === void 0 ? void 0 : story.getAttribute('data-id')) || '';
        const storyIndex = findStoryIndex(storyId);
        const storyItems = document.querySelectorAll(`#${id} [data-id="${storyId}"] .items > li`);
        const items = [];
        if (!option('reactive') || forceUpdate) {
            storyItems.forEach(({ firstElementChild }) => {
                const a = firstElementChild;
                const img = a === null || a === void 0 ? void 0 : a.firstElementChild;
                const li = a === null || a === void 0 ? void 0 : a.parentElement;
                const item = {
                    id: (a === null || a === void 0 ? void 0 : a.getAttribute('data-id')) || (li === null || li === void 0 ? void 0 : li.getAttribute('data-id')),
                    src: a === null || a === void 0 ? void 0 : a.getAttribute('href'),
                    length: safeNum(a === null || a === void 0 ? void 0 : a.getAttribute('data-length')),
                    type: a === null || a === void 0 ? void 0 : a.getAttribute('data-type'),
                    time: (a === null || a === void 0 ? void 0 : a.getAttribute('data-time')) || (li === null || li === void 0 ? void 0 : li.getAttribute('data-time')),
                    link: (a === null || a === void 0 ? void 0 : a.getAttribute('data-link')) || '',
                    linkText: a === null || a === void 0 ? void 0 : a.getAttribute('data-linkText'),
                    preview: img === null || img === void 0 ? void 0 : img.getAttribute('src'),
                    seen: li === null || li === void 0 ? void 0 : li.classList.contains('seen')
                };
                const all = a === null || a === void 0 ? void 0 : a.attributes;
                const reserved = [
                    'data-id',
                    'href',
                    'data-length',
                    'data-type',
                    'data-time',
                    'data-link',
                    'data-linkText'
                ];
                if (all) {
                    for (let z = 0; z < all.length; z++) {
                        if (reserved.indexOf(all[z].nodeName) === -1) {
                            item[all[z].nodeName.replace('data-', '')] = all === null || all === void 0 ? void 0 : all[z].nodeValue;
                        }
                    }
                }
                // destruct the remaining attributes as options
                items.push(item);
            });
            data[storyIndex].items = items;
            const callback = callbackOption('onDataUpdate');
            if (callback) {
                callback(data, () => { });
            }
        }
    };
    const parseStory = function (story) {
        var _a, _b;
        const storyId = (story === null || story === void 0 ? void 0 : story.getAttribute('data-id')) || '';
        const storyIndex = findStoryIndex(storyId);
        let seen = false;
        if (internalData.seenItems[storyId]) {
            seen = true;
        }
        try {
            let storyData = {};
            if (storyIndex !== -1) {
                storyData = data[storyIndex];
            }
            storyData.id = storyId;
            storyData.photo = story === null || story === void 0 ? void 0 : story.getAttribute('data-photo');
            storyData.name = (_a = story === null || story === void 0 ? void 0 : story.querySelector('.name')) === null || _a === void 0 ? void 0 : _a.innerText;
            storyData.link = (_b = story === null || story === void 0 ? void 0 : story.querySelector('.item-link')) === null || _b === void 0 ? void 0 : _b.getAttribute('href');
            storyData.lastUpdated = safeNum((story === null || story === void 0 ? void 0 : story.getAttribute('data-last-updated')) ||
                (story === null || story === void 0 ? void 0 : story.getAttribute('data-time')));
            storyData.seen = seen;
            if (!storyData.items) {
                storyData.items = [];
            }
            if (storyIndex === -1) {
                data.push(storyData);
            }
            else {
                data[storyIndex] = storyData;
            }
        }
        catch (e) {
            data[storyIndex] = {
                items: []
            };
        }
        if (story) {
            story.onclick = (e) => {
                e.preventDefault();
                modal.show(storyId);
            };
        }
        const callback = callbackOption('onDataUpdate');
        if (callback) {
            callback(data, () => { });
        }
    };
    const add = (data, append) => {
        var _a, _b, _c, _d;
        const storyId = data['id'] || '';
        const storyEl = document.querySelector(`#${id} [data-id="${storyId}"]`);
        const items = data['items'];
        let story = null;
        let preview = undefined;
        if (items === null || items === void 0 ? void 0 : items[0]) {
            preview = ((_a = items === null || items === void 0 ? void 0 : items[0]) === null || _a === void 0 ? void 0 : _a.preview) || '';
        }
        if (internalData.seenItems[storyId] === true) {
            data.seen = true;
        }
        if (data) {
            data.currentPreview = preview;
        }
        if (!storyEl) {
            const storyItem = document.createElement('div');
            storyItem.innerHTML = templateOption('timelineItem')(data);
            story = storyItem.firstElementChild;
        }
        else {
            story = storyEl;
        }
        if (data.seen === false) {
            internalData.seenItems[storyId] = false;
            saveLocalData('seenItems', internalData.seenItems);
        }
        story === null || story === void 0 ? void 0 : story.setAttribute('data-id', storyId);
        if (data['photo']) {
            story === null || story === void 0 ? void 0 : story.setAttribute('data-photo', data['photo']);
        }
        story === null || story === void 0 ? void 0 : story.setAttribute('data-time', (_b = data['time']) === null || _b === void 0 ? void 0 : _b.toString());
        if (data['lastUpdated']) {
            story === null || story === void 0 ? void 0 : story.setAttribute('data-last-updated', (_c = data['lastUpdated']) === null || _c === void 0 ? void 0 : _c.toString());
        }
        else {
            story === null || story === void 0 ? void 0 : story.setAttribute('data-last-updated', (_d = data['time']) === null || _d === void 0 ? void 0 : _d.toString());
        }
        parseStory(story);
        if (!storyEl && !option('reactive')) {
            if (append) {
                timeline.appendChild(story);
            }
            else {
                prepend(timeline, story);
            }
        }
        items === null || items === void 0 ? void 0 : items.forEach((item) => {
            addItem(storyId, item, append);
        });
        if (!append) {
            updateStorySeenPosition();
        }
    };
    const update = add;
    const next = () => {
        modal.next();
    };
    const remove = (storyId) => {
        var _a;
        const story = document.querySelector(`#${id} > [data-id="${storyId}"]`);
        (_a = story === null || story === void 0 ? void 0 : story.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(story);
    };
    const addItem = (storyId, data, append) => {
        const story = document.querySelector(`#${id} > [data-id="${storyId}"]`);
        if (!option('reactive')) {
            const li = document.createElement('li');
            const el = story === null || story === void 0 ? void 0 : story.querySelectorAll('.items')[0];
            if (data['id']) {
                li.className = data['seen'] ? 'seen' : '';
                li.setAttribute('data-id', data['id']);
            }
            li.innerHTML = templateOption('timelineStoryItem')(data);
            if (append) {
                el === null || el === void 0 ? void 0 : el.appendChild(li);
            }
            else {
                prepend(el, li);
            }
        }
        parseItems(story);
    };
    const removeItem = (storyId, itemId) => {
        var _a;
        const item = document.querySelector(`#${id} > [data-id="${storyId}"] [data-id="${itemId}"]`);
        if (!option('reactive')) {
            (_a = item === null || item === void 0 ? void 0 : item.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(item);
            data.forEach((story) => {
                if (story.id === storyId) {
                    story.items = story.items.filter((item) => item.id !== itemId);
                }
            });
        }
    };
    const nextItem = (direction, event) => {
        const currentStory = internalData.currentStory;
        const currentStoryIndex = findStoryIndex(internalData.currentStory);
        const currentItem = data[currentStoryIndex].currentItem;
        const storyViewer = document.querySelector(`#zuck-modal .story-viewer[data-story-id="${currentStory}"]`);
        const directionNumber = direction === 'previous' ? -1 : 1;
        if (!storyViewer) {
            return false;
        }
        const currentItemElements = storyViewer.querySelectorAll(`[data-index="${currentItem}"]`);
        const currentPointer = currentItemElements[0];
        const currentItemElement = currentItemElements[1];
        const navigateItem = currentItem + directionNumber;
        const nextItems = storyViewer.querySelectorAll(`[data-index="${navigateItem}"]`);
        const nextPointer = nextItems[0];
        const nextItem = nextItems[1];
        if (storyViewer && nextPointer && nextItem) {
            const navigateItemCallback = function () {
                if (direction === 'previous') {
                    currentPointer === null || currentPointer === void 0 ? void 0 : currentPointer.classList.remove('seen');
                    currentItemElement === null || currentItemElement === void 0 ? void 0 : currentItemElement.classList.remove('seen');
                }
                else {
                    currentPointer === null || currentPointer === void 0 ? void 0 : currentPointer.classList.add('seen');
                    currentItemElement === null || currentItemElement === void 0 ? void 0 : currentItemElement.classList.add('seen');
                }
                currentPointer === null || currentPointer === void 0 ? void 0 : currentPointer.classList.remove('active');
                currentItemElement === null || currentItemElement === void 0 ? void 0 : currentItemElement.classList.remove('active');
                nextPointer === null || nextPointer === void 0 ? void 0 : nextPointer.classList.remove('seen');
                nextPointer === null || nextPointer === void 0 ? void 0 : nextPointer.classList.add('active');
                nextItem === null || nextItem === void 0 ? void 0 : nextItem.classList.remove('seen');
                nextItem === null || nextItem === void 0 ? void 0 : nextItem.classList.add('active');
                storyViewer
                    .querySelectorAll('.time')
                    .forEach((el) => {
                    el.innerText = timeAgo(Number(nextItem.getAttribute('data-time')), option('language'));
                });
                data[currentStoryIndex].currentItem =
                    data[currentStoryIndex].currentItem + directionNumber;
                const nextVideo = nextItem.querySelector('video');
                if (nextVideo) {
                    nextVideo.currentTime = 0;
                }
                playVideoItem(storyViewer, nextItems, event);
            };
            let callback = callbackOption('onNavigateItem');
            callback = !callback
                ? callbackOption('onNextItem')
                : callbackOption('onNavigateItem');
            callback(currentStory, nextItem.getAttribute('data-story-id'), navigateItemCallback);
        }
        else if (storyViewer) {
            if (direction !== 'previous') {
                modal.next();
            }
        }
        return true;
    };
    const navigateItem = nextItem;
    const updateStorySeenPosition = function () {
        document
            .querySelectorAll(`#${id} .story.seen`)
            .forEach((el) => {
            const storyId = el === null || el === void 0 ? void 0 : el.getAttribute('data-id');
            const storyIndex = findStoryIndex(storyId);
            if (storyId) {
                const newData = data[storyIndex];
                const timeline = el === null || el === void 0 ? void 0 : el.parentNode;
                if (!option('reactive') && timeline) {
                    timeline.removeChild(el);
                }
                update(newData, true);
            }
        });
    };
    const init = () => {
        if (timeline && timeline.querySelector('.story')) {
            timeline.querySelectorAll('.story').forEach((story) => {
                parseStory(story);
                parseItems(story);
            });
        }
        if (option('backNative') && hasWindow()) {
            if (window.location.hash === `#!${id}`) {
                window.location.hash = '';
            }
            window.addEventListener('popstate', () => {
                if (window.location.hash !== `#!${id}`) {
                    window.location.hash = '';
                }
            }, false);
        }
        if (!option('reactive')) {
            const seenItems = getLocalData('seenItems');
            if (seenItems) {
                Object.entries(seenItems).forEach(([, key]) => {
                    if (key && data[key]) {
                        data[key].seen = seenItems[key] ? true : false;
                    }
                });
            }
        }
        option('stories').forEach((item) => {
            add(item, true);
        });
        updateStorySeenPosition();
        const avatars = option('avatars') ? 'user-icon' : 'story-preview';
        const list = option('list') ? 'list' : 'carousel';
        const rtl = option('rtl') ? 'rtl' : '';
        timeline.className += ` stories ${avatars} ${list} ${`${option('skin')}`.toLowerCase()} ${rtl}`;
        return {
            id,
            option,
            callback: callbackOption,
            template: templateOption,
            language: languageOption,
            navigateItem,
            saveLocalData,
            getLocalData,
            data,
            internalData,
            add,
            update,
            next,
            remove,
            addItem,
            removeItem,
            nextItem,
            findStoryIndex,
            updateStorySeenPosition,
            playVideoItem,
            pauseVideoItem,
            unmuteVideoItem
        };
    };
    const zuck = init();
    const modal = ZuckModal(zuck);
    return zuck;
};
export default Zuck;