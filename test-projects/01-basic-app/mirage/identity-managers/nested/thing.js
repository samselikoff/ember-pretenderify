export default class {
  constructor() {
    this.reset();
  }

  /**
   * Returns an unique identifier.
   *
   * @method fetch
   * @return {String} Unique identifier
   * @public
   */
  fetch() {
    let id;

    if (this._nextId >= 1) {
      throw new Error(`IdentityManager used for testing only supports single id.`);
    }
    id = 'nested identity manager works!';
    this._ids[id] = true;
    this._nextId = this._nextid + 1;
    return id;
  }

  /**
   * Register an identifier.
   * Must throw if identifier is already used.
   *
   * @method set
   * @param {String|Number} id
   * @public
   */
  set(id) {
    if (typeof this._ids[id] !== 'undefined') {
      throw new Error(`Id {id} is already used.`);
    }

    this._ids[id] = true;

    let int = parseInt(id, 16);
    if (!isNaN(int) && int > this._nextid) {
      this._nextId = int;
    }
  }

  /**
   * Reset identity manager.
   *
   * @method reset
   * @public
   */
  reset() {
    this._nextId = 0;
    this._ids =  {};
  }
}
