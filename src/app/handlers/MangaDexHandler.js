import { MediaHandler, MIN_CYCLE } from '../MediaHandler'

export class MangaDexHandler extends MediaHandler {

  accept (url) {
    return (url.indexOf('mangadex.com') >= 0 || url.indexOf('mangadex.org') >= 0) && url.split('/')[3].toLowerCase() === 'chapter' && (url.match(/\//g) || []).length >= 4
  }

  verify (source, cycle, $) {
    return super.lifeOf(cycle) > MIN_CYCLE
  }

  parseData (source, $) {
    let title = (/\(([^)]+)\)/).exec($('title')[0].children[0].data.trim())[1]

    let episode = $('[name=jump_chapter] option:selected')[0].children[0].data.trim()
    episode = super.parseChapter(episode)

    return { source: 'MangaDex', title: title, episode: episode }
  }
}
